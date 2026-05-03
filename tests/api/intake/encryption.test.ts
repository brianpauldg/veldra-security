import { describe, it, expect } from 'vitest'
import crypto from 'crypto'

describe('intake form encryption round-trip', () => {
  const ENCRYPTION_KEY = 'a'.repeat(64) // 64 hex chars = 32 bytes

  function encrypt(plaintext: string): string {
    const key = Buffer.from(ENCRYPTION_KEY, 'hex')
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
    const tag = cipher.getAuthTag()
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`
  }

  function decrypt(ciphertext: string): string {
    const key = Buffer.from(ENCRYPTION_KEY, 'hex')
    const [ivHex, tagHex, encryptedHex] = ciphertext.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const tag = Buffer.from(tagHex, 'hex')
    const encrypted = Buffer.from(encryptedHex, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(tag)
    return decipher.update(encrypted) + decipher.final('utf8')
  }

  it('round-trip encrypt/decrypt produces identical input', () => {
    const original = JSON.stringify({
      dateOfBirth: '1990-01-01',
      state: 'CA',
      biologicalSex: 'male',
      currentMedications: 'Lisinopril 10mg',
      allergies: 'None',
      fatigue: '2',
      libido: '3',
    })

    const encrypted = encrypt(original)
    expect(encrypted).not.toBe(original)
    expect(encrypted).toContain(':') // hex:hex:hex format

    const decrypted = decrypt(encrypted)
    expect(decrypted).toBe(original)
    expect(JSON.parse(decrypted)).toEqual(JSON.parse(original))
  })

  it('different encryptions of same input produce different ciphertexts', () => {
    const input = 'sensitive medical data'
    const enc1 = encrypt(input)
    const enc2 = encrypt(input)
    expect(enc1).not.toBe(enc2) // random IV makes each unique
    expect(decrypt(enc1)).toBe(input)
    expect(decrypt(enc2)).toBe(input)
  })

  it('tampered ciphertext throws on decrypt', () => {
    const encrypted = encrypt('test data')
    const parts = encrypted.split(':')
    parts[2] = 'ff' + parts[2].slice(2) // tamper with encrypted data
    const tampered = parts.join(':')
    expect(() => decrypt(tampered)).toThrow()
  })
})
