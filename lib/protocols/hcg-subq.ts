import { ProtocolContent } from './types';

export const hcgSubq: ProtocolContent = {
  slug: 'hcg-subq',
  medication: 'Human Chorionic Gonadotropin (HCG)',
  route: 'SubQ',
  syringe: {
    type: 'insulin',
    gauge: '29g–31g',
    length: '5/16" (8mm)',
    visualNotes: 'Insulin syringe with fixed needle. Use a 0.5mL or 1mL barrel. The short needle is designed for subcutaneous injection depth only.',
  },
  angle: {
    degrees: 90,
    technique: 'Pinch a fold of skin at the injection site. Insert needle at 90 degrees into the pinched fold. Hold the pinch throughout the injection.',
    pinchAndPoke: true,
  },
  sites: [
    {
      name: 'Abdomen',
      anatomicalLocation: 'At least 2 inches (5cm) from the navel, alternating sides',
      recommended: true,
      notes: 'Preferred site. Use the fatty tissue of the lower abdomen. Rotate injection locations within the abdominal region to prevent lipohypertrophy.',
      diagramId: 'abdomen',
    },
    {
      name: 'Anterior Thigh',
      anatomicalLocation: 'Front of the thigh, middle third between knee and hip',
      recommended: true,
      notes: 'Good alternative site. Use the outer or front surface, where subcutaneous fat is accessible.',
      diagramId: 'thigh-anterior',
    },
  ],
  rotation: {
    cadence: 'Rotate with each injection',
    pattern: 'Alternate between left and right sides. Within each side, vary the exact location by at least 1 inch from the previous injection.',
  },
  aspiration: {
    required: false,
    rationale: 'Aspiration is not required or recommended for subcutaneous injections.',
  },
  videoUrl: '/inject/videos/hcg-subq-demo.mp4',
  videoPoster: '/inject/videos/hcg-subq-poster.jpg',
  videoDurationSec: 120,
  troubleshooting: [
    {
      question: 'I saw blood when I aspirated or after removing the needle',
      answer: 'A small drop of blood at the injection site is normal. Press gently with a clean gauze pad. This does not affect the medication.',
    },
    {
      question: 'The needle bent during injection',
      answer: 'Do not attempt to straighten or reinsert a bent needle. Discard the entire syringe in your sharps container and prepare a new dose with a fresh syringe.',
    },
    {
      question: 'I missed my scheduled injection day',
      answer: 'Administer your injection as soon as you remember. If it is very close to your next scheduled dose, contact your care team for guidance. Do not double your dose.',
    },
    {
      question: 'The injection site is red, swollen, or painful 24+ hours later',
      answer: 'Mild site reactions are common and usually resolve within 1–2 days. If the area becomes increasingly red, warm, or swollen, or if you develop fever, contact your care team.',
    },
    {
      question: 'I am not sure I injected the full dose',
      answer: 'Check that the plunger is fully depressed. If so, you received the full dose. Do not attempt to re-inject. Note this at your next check-in.',
    },
    {
      question: 'How do I reconstitute my HCG',
      answer: 'Follow the reconstitution instructions provided by your compounding pharmacy. Typically: inject the bacteriostatic water slowly into the powder vial, then gently swirl (do not shake) until fully dissolved. Store reconstituted HCG in the refrigerator and use within the timeframe specified by your pharmacy.',
    },
  ],
  frequencyNote: 'Administer per your prescribed protocol. Your prescriber will specify your injection frequency.',
  storageNote: 'Refrigerate after reconstitution at 36–46°F (2–8°C). Do not freeze. Use within the timeframe specified by your compounding pharmacy. Protect from light.',
  physicianReviewedDate: '2026-05-02',
  physicianName: 'Clinical Review Pending',
  physicianCredentials: 'MD',
  contentVersion: '1.0.0',
};
