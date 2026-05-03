/**
 * Bloom Metabolics — Patient ID Migration Script
 * Adds ehr_patient_id column to compliance tables and populates from ehr_patient_mappings.
 * DO NOT run automatically — execute manually post-OptiMantra-onboarding.
 *
 * Usage: npx tsx scripts/migrate-patient-ids-to-ehr.ts [--dry-run]
 */

import { createClient } from '@supabase/supabase-js'

const MIGRATION_TABLES = [
  'compounded_rx_justifications',
  'pmp_queries',
  'signed_consents',
  'medical_director_review_queue',
  'ai_write_confirmations',
]

interface MigrationReport {
  table: string
  total: number
  migrated: number
  orphans: string[] // patient_ids with no mapping
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!url || !key) {
    console.error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required')
    process.exit(1)
  }

  const sb = createClient(url, key)
  const reports: MigrationReport[] = []

  console.log(`\n${'='.repeat(60)}`)
  console.log(`Patient ID Migration to EHR — ${dryRun ? 'DRY RUN' : 'LIVE'}`)
  console.log(`${'='.repeat(60)}\n`)

  // Load all mappings
  const { data: mappings } = await sb
    .from('ehr_patient_mappings')
    .select('local_patient_id, ehr_external_id')
    .eq('ehr_provider', 'optimantra')
    .eq('active', true)

  const mappingLookup = new Map<string, string>()
  for (const m of mappings || []) {
    mappingLookup.set(m.local_patient_id, m.ehr_external_id)
  }

  console.log(`Loaded ${mappingLookup.size} active patient mappings\n`)

  for (const table of MIGRATION_TABLES) {
    console.log(`Processing: ${table}`)

    // Get distinct patient_ids from table
    const { data: rows } = await sb
      .from(table)
      .select('patient_id')

    const uniqueIds = [...new Set((rows || []).map(r => r.patient_id).filter(Boolean))]
    const report: MigrationReport = { table, total: uniqueIds.length, migrated: 0, orphans: [] }

    for (const patientId of uniqueIds) {
      const ehrId = mappingLookup.get(patientId)
      if (ehrId) {
        if (!dryRun) {
          await sb.from(table)
            .update({ ehr_patient_id: ehrId })
            .eq('patient_id', patientId)
        }
        report.migrated++
      } else {
        report.orphans.push(patientId)
      }
    }

    console.log(`  Total: ${report.total} | Migrated: ${report.migrated} | Orphans: ${report.orphans.length}`)
    if (report.orphans.length > 0) {
      console.log(`  ⚠️  Orphaned patient_ids: ${report.orphans.join(', ')}`)
    }
    reports.push(report)
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`)
  console.log('SUMMARY')
  console.log(`${'='.repeat(60)}`)
  const totalOrphans = reports.reduce((sum, r) => sum + r.orphans.length, 0)
  const totalMigrated = reports.reduce((sum, r) => sum + r.migrated, 0)
  console.log(`Tables processed: ${reports.length}`)
  console.log(`Records migrated: ${totalMigrated}`)
  console.log(`Orphans (no mapping): ${totalOrphans}`)
  if (dryRun) console.log('\n⚠️  DRY RUN — no changes were made')
  if (totalOrphans > 0) console.log('\n⚠️  Resolve orphans before marking migration complete')
}

main().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
