import { ProtocolContent } from './types';

export const trtIm: ProtocolContent = {
  slug: 'trt-im',
  medication: 'Testosterone Cypionate',
  route: 'IM',
  syringe: {
    type: 'intramuscular',
    gauge: '23g–25g',
    length: '1 inch',
    visualNotes: '1mL or 3mL barrel with detachable needle. Draw with an 18g needle, inject with a 23g–25g needle.',
  },
  angle: {
    degrees: 90,
    technique: 'Insert needle at 90 degrees to the skin surface. Do not pinch the skin for intramuscular injections in these sites.',
    pinchAndPoke: false,
  },
  sites: [
    {
      name: 'Ventrogluteal',
      anatomicalLocation: 'Upper lateral hip, between the iliac crest and greater trochanter',
      recommended: true,
      notes: 'Preferred site. Thick muscle mass with minimal nerves and blood vessels. Place palm on greater trochanter, index finger on anterior iliac spine, spread middle finger posteriorly — inject in the V formed.',
      diagramId: 'ventrogluteal',
    },
    {
      name: 'Vastus Lateralis',
      anatomicalLocation: 'Outer middle third of the thigh, between knee and hip',
      recommended: true,
      notes: 'Preferred alternative. Easy self-injection site. Divide the thigh into thirds — inject into the outer middle third.',
      diagramId: 'vastus-lateralis',
    },
    {
      name: 'Deltoid',
      anatomicalLocation: 'Lateral deltoid muscle, approximately 2–3 fingerbreadths below the acromion process',
      recommended: false,
      notes: 'Acceptable for volumes under 1mL only. Smaller muscle mass limits injection volume.',
      diagramId: 'deltoid',
    },
    {
      name: 'Dorsogluteal',
      anatomicalLocation: 'Upper outer quadrant of the buttock',
      recommended: false,
      notes: 'Acceptable but use caution. Proximity to the sciatic nerve requires careful landmarking. Ventrogluteal is preferred over this site.',
      diagramId: 'dorsogluteal',
    },
  ],
  rotation: {
    cadence: 'Rotate injection site with each administration',
    pattern: 'Alternate between left and right sides weekly. Cycle through recommended sites to allow tissue recovery.',
  },
  aspiration: {
    required: false,
    rationale: 'Current evidence does not support routine aspiration for intramuscular injections in the ventrogluteal or vastus lateralis sites. This is consistent with CDC guidelines and current nursing literature.',
  },
  videoUrl: '/inject/videos/trt-im-demo.mp4',
  videoPoster: '/inject/videos/trt-im-poster.jpg',
  videoDurationSec: 180,
  troubleshooting: [
    {
      question: 'I saw blood when I aspirated or after removing the needle',
      answer: 'A small amount of blood at the injection site is normal and results from puncturing superficial capillaries. Apply gentle pressure with a clean gauze pad. If you aspirated and drew blood into the barrel, withdraw the needle, discard the syringe, and prepare a new injection at a different site.',
    },
    {
      question: 'The needle bent during injection',
      answer: 'Do not attempt to straighten or reinsert a bent needle. Withdraw it carefully, discard it in your sharps container, and prepare a new syringe with a fresh needle. Ensure you are relaxing the target muscle before insertion.',
    },
    {
      question: 'I missed my scheduled injection day',
      answer: 'Administer your injection as soon as you remember. If it is close to your next scheduled dose, contact your care team for guidance. Do not double your dose.',
    },
    {
      question: 'The injection site is red, swollen, or painful 24+ hours later',
      answer: 'Mild soreness for 24–48 hours is common with intramuscular injections. Apply a warm compress to the area. If you observe increasing redness, warmth, swelling, drainage, or develop fever, contact your care team immediately.',
    },
    {
      question: 'I am not sure I injected the full dose',
      answer: 'If the syringe barrel appears empty, you likely received the full dose. A small amount of medication may remain in the needle hub — this is normal and accounted for in dosing. Do not attempt a second injection. Note this at your next check-in.',
    },
    {
      question: 'The oil was difficult to push through the needle',
      answer: 'Testosterone cypionate is an oil-based solution and may feel viscous. Warm the vial between your palms for 1–2 minutes before drawing. Inject slowly and steadily. Using a 23g needle rather than 25g may reduce resistance.',
    },
  ],
  frequencyNote: 'Administer per your prescribed protocol. Your prescriber will specify your injection frequency.',
  storageNote: 'Store at controlled room temperature (68–77°F / 20–25°C). Protect from light. Do not refrigerate or freeze.',
  physicianReviewedDate: '2026-05-02',
  physicianName: 'Clinical Review Pending',
  physicianCredentials: 'MD',
  contentVersion: '1.0.0',
};
