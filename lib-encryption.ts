// lib/encryption.ts — AES-256-GCM encryption for sensitive data
// Server-side only — never import this in client components

import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY_LENGTH = 32  // 256 bits
const IV_LENGTH = 16   // 128 bits
const TAG_LENGTH = 16  // 128 bits
const SALT_LENGTH = 64

// Get encryption key from env — never hardcode this
function getEncryptionKey(): Buffer {
  const keyHex = process.env.ENCRYPTION_KEY
  if (!keyHex) throw new Error('ENCRYPTION_KEY environment variable not set')
  const key = Buffer.from(keyHex, 'hex')
  if (key.length !== KEY_LENGTH) throw new Error('ENCRYPTION_KEY must be 64 hex characters (32 bytes)')
  return key
}

// ── ENCRYPT STRING DATA ───────────────────────────────────────────────────────
export function encrypt(plaintext: string): string {
  const key = getEncryptionKey()
  const iv = crypto.randomBytes(IV_LENGTH)
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ])
  const tag = cipher.getAuthTag()
  
  // Format: iv:tag:encrypted (all hex)
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`
}

// ── DECRYPT STRING DATA ───────────────────────────────────────────────────────
export function decrypt(ciphertext: string): string {
  const key = getEncryptionKey()
  const [ivHex, tagHex, encryptedHex] = ciphertext.split(':')
  
  if (!ivHex || !tagHex || !encryptedHex) throw new Error('Invalid ciphertext format')
  
  const iv = Buffer.from(ivHex, 'hex')
  const tag = Buffer.from(tagHex, 'hex')
  const encrypted = Buffer.from(encryptedHex, 'hex')
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(tag)
  
  return decipher.update(encrypted) + decipher.final('utf8')
}

// ── HASH SENSITIVE DATA (one-way, for searching) ─────────────────────────────
export function hashSensitiveData(data: string, salt?: string): { hash: string; salt: string } {
  const usedSalt = salt || crypto.randomBytes(SALT_LENGTH).toString('hex')
  const hash = crypto
    .createHmac('sha256', usedSalt)
    .update(data.toLowerCase().trim())
    .digest('hex')
  return { hash, salt: usedSalt }
}

// ── GENERATE SECURE RANDOM TOKEN ─────────────────────────────────────────────
export function generateSecureToken(length = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

// ── GENERATE ENCRYPTION KEY (run once to create your ENCRYPTION_KEY env var) ──
export function generateEncryptionKey(): string {
  return crypto.randomBytes(KEY_LENGTH).toString('hex')
}

// ── ENCRYPT FILE BUFFER (for document storage) ────────────────────────────────
export function encryptFile(fileBuffer: Buffer): {
  encrypted: Buffer
  iv: string
  tag: string
} {
  const key = getEncryptionKey()
  const iv = crypto.randomBytes(IV_LENGTH)
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()])
  const tag = cipher.getAuthTag()
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
  }
}

// ── DECRYPT FILE BUFFER ───────────────────────────────────────────────────────
export function decryptFile(encrypted: Buffer, ivHex: string, tagHex: string): Buffer {
  const key = getEncryptionKey()
  const iv = Buffer.from(ivHex, 'hex')
  const tag = Buffer.from(tagHex, 'hex')
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(tag)
  
  return Buffer.concat([decipher.update(encrypted), decipher.final()])
}
