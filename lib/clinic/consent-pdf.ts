/**
 * Bloom Metabolics — Consent PDF Generation
 * Server-side only. Uses pdfkit to generate signed consent documents as PDF buffers.
 */

import PDFDocument from 'pdfkit'

interface ConsentPDFParams {
  templateTitle: string
  templateBody: string
  templateVersion: string
  patientName: string
  signatureDataURL: string // base64 PNG data URL
  signedAt: string // ISO timestamp
  ipAddress: string
  contentHash: string
}

/**
 * Generate a PDF buffer for a signed consent document.
 */
export async function generateConsentPDF(params: ConsentPDFParams): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: 60, bottom: 60, left: 60, right: 60 },
      info: {
        Title: params.templateTitle,
        Author: 'Bloom Metabolics',
        Subject: 'Signed Informed Consent',
        Creator: 'Bloom Metabolics Clinical OS',
      },
    })

    const chunks: Buffer[] = []
    doc.on('data', (chunk: Buffer) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    // Header
    doc.fontSize(8).fillColor('#8a8268')
      .text('BLOOM METABOLICS — SIGNED INFORMED CONSENT', { align: 'center' })
    doc.moveDown(0.5)
    doc.moveTo(60, doc.y).lineTo(552, doc.y).strokeColor('#d8cfbe').lineWidth(0.5).stroke()
    doc.moveDown(1)

    // Title
    doc.fontSize(16).fillColor('#020202')
      .text(params.templateTitle, { align: 'center' })
    doc.fontSize(9).fillColor('#8a8268')
      .text(`Version ${params.templateVersion}`, { align: 'center' })
    doc.moveDown(1.5)

    // Body — render markdown-like content
    const lines = params.templateBody.split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('<!--')) continue

      if (trimmed.startsWith('# ')) {
        doc.moveDown(0.5)
        doc.fontSize(14).fillColor('#020202').text(trimmed.replace('# ', ''))
        doc.moveDown(0.3)
      } else if (trimmed.startsWith('## ')) {
        doc.moveDown(0.5)
        doc.fontSize(11).fillColor('#020202').text(trimmed.replace('## ', ''), { underline: true })
        doc.moveDown(0.2)
      } else if (trimmed.startsWith('### ')) {
        doc.moveDown(0.3)
        doc.fontSize(10).fillColor('#020202').text(trimmed.replace('### ', ''), { bold: true } as any)
      } else if (trimmed.startsWith('- **')) {
        doc.fontSize(9).fillColor('#020202')
        const content = trimmed.replace('- **', '').replace('**:', ':').replace('**', '')
        doc.text(`  •  ${content}`, { indent: 10 })
      } else if (trimmed.startsWith('- ')) {
        doc.fontSize(9).fillColor('#333333')
          .text(`  •  ${trimmed.replace('- ', '')}`, { indent: 10 })
      } else if (trimmed.startsWith('**')) {
        doc.fontSize(9).fillColor('#020202')
          .text(trimmed.replace(/\*\*/g, ''), { bold: true } as any)
      } else {
        doc.fontSize(9).fillColor('#333333').text(trimmed)
      }
    }

    // Signature section
    doc.moveDown(2)
    doc.moveTo(60, doc.y).lineTo(552, doc.y).strokeColor('#d8cfbe').lineWidth(0.5).stroke()
    doc.moveDown(1)

    doc.fontSize(11).fillColor('#020202').text('SIGNATURE', { underline: true })
    doc.moveDown(0.5)

    doc.fontSize(9).fillColor('#333333')
    doc.text(`Patient Name: ${params.patientName}`)
    doc.text(`Signed At: ${new Date(params.signedAt).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PT`)
    doc.text(`IP Address: ${params.ipAddress || 'Not recorded'}`)
    doc.moveDown(0.5)

    // Embed signature image if provided
    if (params.signatureDataURL && params.signatureDataURL.startsWith('data:image/png;base64,')) {
      try {
        const base64Data = params.signatureDataURL.replace('data:image/png;base64,', '')
        const imgBuffer = Buffer.from(base64Data, 'base64')
        doc.image(imgBuffer, { width: 200, height: 60 })
      } catch {
        doc.fontSize(9).fillColor('#8a8268').text('[Signature image could not be embedded]')
      }
    }

    doc.moveDown(1)
    doc.moveTo(60, doc.y).lineTo(300, doc.y).strokeColor('#020202').lineWidth(0.5).stroke()
    doc.moveDown(0.3)
    doc.fontSize(8).fillColor('#8a8268').text('Patient Signature')

    // Footer — verification
    doc.moveDown(2)
    doc.moveTo(60, doc.y).lineTo(552, doc.y).strokeColor('#d8cfbe').lineWidth(0.5).stroke()
    doc.moveDown(0.5)
    doc.fontSize(7).fillColor('#8a8268')
      .text(`Content Hash (SHA-256): ${params.contentHash}`, { align: 'center' })
    doc.text('This document was electronically signed via Bloom Metabolics Clinical OS.', { align: 'center' })
    doc.text('Verify integrity by comparing the content hash against the stored consent record.', { align: 'center' })

    doc.end()
  })
}
