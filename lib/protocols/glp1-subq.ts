import { ProtocolContent } from './types';

export const glp1Subq: ProtocolContent = {
  slug: 'glp1-subq',
  medication: 'Semaglutide / Tirzepatide',
  route: 'SubQ',
  syringe: {
    type: 'insulin',
    gauge: '29g–31g',
    length: '5/16" (8mm) or 1/2" (12.7mm)',
    visualNotes: 'Insulin syringe with fixed needle. Use a 0.5mL or 1mL barrel depending on prescribed volume. The needle is pre-attached and should not be removed.',
  },
  angle: {
    degrees: 90,
    technique: 'Pinch a fold of skin at the injection site. Insert needle at 90 degrees into the pinched fold. For very lean patients with minimal subcutaneous tissue, a 45-degree angle may be more appropriate.',
    pinchAndPoke: true,
  },
  sites: [
    {
      name: 'Abdomen',
      anatomicalLocation: 'At least 2 inches (5cm) from the navel, avoiding the waistline',
      recommended: true,
      notes: 'Preferred site for consistent absorption. Avoid areas with scars, bruises, or stretch marks. Rotate within the abdominal region using a clock pattern.',
      diagramId: 'abdomen',
    },
    {
      name: 'Anterior / Lateral Thigh',
      anatomicalLocation: 'Front or outer side of the thigh, middle third between knee and hip',
      recommended: true,
      notes: 'Good alternative site. Use the outer or front surface of the thigh. Avoid the inner thigh.',
      diagramId: 'thigh-anterior',
    },
    {
      name: 'Posterior Upper Arm',
      anatomicalLocation: 'Back of the upper arm, between the shoulder and elbow',
      recommended: false,
      notes: 'Acceptable site but may require assistance from another person for proper technique. Pinch the skin firmly before injecting.',
      diagramId: 'upper-arm',
    },
  ],
  rotation: {
    cadence: 'Rotate sites weekly',
    pattern: 'Do not inject into the same square inch within 7 days. Use a different area within the same site or a different site entirely for each injection.',
  },
  aspiration: {
    required: false,
    rationale: 'Aspiration is not required or recommended for subcutaneous injections.',
  },
  videoUrl: '/inject/videos/glp1-subq-demo.mp4',
  videoPoster: '/inject/videos/glp1-subq-poster.jpg',
  videoDurationSec: 150,
  troubleshooting: [
    {
      question: 'I saw blood when I aspirated or after removing the needle',
      answer: 'A small drop of blood at the injection site is normal. Press gently with a clean gauze pad for 10–15 seconds. Do not rub the area.',
    },
    {
      question: 'The needle bent during injection',
      answer: 'Do not attempt to straighten or reinsert a bent needle. Discard the entire syringe in your sharps container and prepare a new dose. Ensure you are pinching the skin firmly and inserting smoothly.',
    },
    {
      question: 'I missed my scheduled injection day',
      answer: 'If less than 5 days have passed since your missed dose, administer it as soon as possible and return to your regular schedule. If more than 5 days have passed, skip the missed dose and take your next dose on the regularly scheduled day. Contact your care team if unsure.',
    },
    {
      question: 'The injection site is red, swollen, or painful 24+ hours later',
      answer: 'Mild injection site reactions (redness, slight swelling, itching) are common and typically resolve within a few days. Apply a cool compress if needed. If the reaction is severe, spreading, or accompanied by fever, contact your care team.',
    },
    {
      question: 'I am not sure I injected the full dose',
      answer: 'Check if the plunger is fully depressed in the syringe. If so, you received the full dose. Do not attempt a second injection. Note this at your next check-in with your care team.',
    },
    {
      question: 'I am experiencing nausea after my injection',
      answer: 'Nausea is a common side effect, especially during dose titration. Eat smaller, more frequent meals. Avoid fatty or greasy foods. Stay hydrated. If nausea is severe or persistent, contact your care team, your dose may need adjustment.',
    },
  ],
  frequencyNote: 'Administer per your prescribed protocol. Your prescriber will specify your injection frequency and titration schedule.',
  storageNote: 'Refrigerate at 36–46°F (2–8°C). Do not freeze. If needed at room temperature, use within the timeframe specified by your compounding pharmacy. Protect from light.',
  physicianReviewedDate: '2026-05-02',
  physicianName: 'Clinical Review Pending',
  physicianCredentials: 'MD',
  contentVersion: '1.0.0',
};
