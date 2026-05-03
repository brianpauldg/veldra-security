import { describe, it, expect } from 'vitest'
import crypto from 'crypto'

describe('leads phone encryption', () => {
  const KEY = 'a'.repeat(64)

  function encryptPhone(phone: string): string {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(KEY, 'hex'), iv)
    const encrypted = Buffer.concat([cipher.update(phone, 'utf8'), cipher.final()])
    const tag = cipher.getAuthTag()
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`
  }

  function decryptPhone(ciphertext: string): string {
    const [ivHex, tagHex, encHex] = ciphertext.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const tag = Buffer.from(tagHex, 'hex')
    const enc = Buffer.from(encHex, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(KEY, 'hex'), iv)
    decipher.setAuthTag(tag)
    return decipher.update(enc) + decipher.final('utf8')
  }

  it('encrypts phone to hex:hex:hex format', () => {
    const encrypted = encryptPhone('5551234567')
    expect(encrypted).toMatch(/^[0-9a-f]+:[0-9a-f]+:[0-9a-f]+$/)
    expect(encrypted).not.toBe('5551234567')
  })

  it('decryption round-trip returns original phone', () => {
    const phone = '5559876543'
    const encrypted = encryptPhone(phone)
    const decrypted = decryptPhone(encrypted)
    expect(decrypted).toBe(phone)
  })

  it('different encryptions produce different ciphertexts', () => {
    const phone = '5551111111'
    const enc1 = encryptPhone(phone)
    const enc2 = encryptPhone(phone)
    expect(enc1).not.toBe(enc2) // Random IV
    expect(decryptPhone(enc1)).toBe(phone)
    expect(decryptPhone(enc2)).toBe(phone)
  })
})
