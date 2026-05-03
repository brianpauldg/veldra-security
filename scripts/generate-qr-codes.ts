import QRCode from 'qrcode';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://bloommetabolics.com';
const OUTPUT_DIR = join(process.cwd(), 'public', 'inject', 'qr');

const protocols = [
  { slug: 'trt-im', label: 'Testosterone Cypionate IM' },
  { slug: 'glp1-subq', label: 'Semaglutide / Tirzepatide SubQ' },
  { slug: 'hcg-subq', label: 'HCG SubQ' },
];

async function generate() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const protocol of protocols) {
    const url = `${BASE_URL}/inject/${protocol.slug}`;
    const outputPath = join(OUTPUT_DIR, `${protocol.slug}.png`);

    const buffer = await QRCode.toBuffer(url, {
      type: 'png',
      width: 1200,
      margin: 4,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#050404',
        light: '#f5ecd9',
      },
    });

    writeFileSync(outputPath, buffer);
    console.log(`Generated: ${outputPath}`);
    console.log(`  URL: ${url}`);
    console.log(`  Size: 1200x1200, Error Correction: H`);
    console.log('');
  }

  console.log('All QR codes generated successfully.');
}

generate().catch((err) => {
  console.error('QR generation failed:', err);
  process.exit(1);
});
