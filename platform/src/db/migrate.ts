import fs from 'node:fs';
import path from 'node:path';
import { getPool, closePool } from './client.js';
import { logger } from '../logger.js';

// tsx handles ESM — __dirname equivalent
const MIGRATIONS_DIR = path.join(path.dirname(__filename), 'migrations');

async function migrate() {
  const pool = getPool();

  // Create migrations tracking table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT NOT NULL UNIQUE,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  // Get applied migrations
  const applied = await pool.query('SELECT filename FROM _migrations ORDER BY id');
  const appliedSet = new Set(applied.rows.map((r: any) => r.filename));

  // Get migration files
  const files = fs.readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    if (appliedSet.has(file)) {
      logger.debug({ file }, 'Migration already applied');
      continue;
    }

    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf-8');
    logger.info({ file }, 'Applying migration...');

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO _migrations (filename) VALUES ($1)', [file]);
      await client.query('COMMIT');
      logger.info({ file }, 'Migration applied successfully');
    } catch (err) {
      await client.query('ROLLBACK');
      logger.error({ file, err }, 'Migration failed');
      throw err;
    } finally {
      client.release();
    }
  }

  logger.info('All migrations complete');
  await closePool();
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
