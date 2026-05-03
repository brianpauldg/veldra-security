// FDA April 1 2026 essentially-a-copy rule + FDA March 3 2026 telehealth warning letters
import { PHARMACY_PARTNER_NAME, PRESCRIBING_ENTITY } from '@/config/clinical/pharmacy-partners'

interface GLP1ComplianceDisclosureProps {
  variant: 'compact' | 'full'
}

export default function GLP1ComplianceDisclosure({ variant }: GLP1ComplianceDisclosureProps) {
  if (variant === 'compact') {
    return (
      <div className="rounded-lg border border-[#1a1814] bg-[#0d0c0a] px-4 py-3 mt-4">
        <p className="text-[10px] text-[#8a8268] leading-relaxed">
          GLP-1 medications provided by {PRESCRIBING_ENTITY} are compounded by {PHARMACY_PARTNER_NAME}. Compounded medications are not FDA-approved. Prescribed based on individual medical evaluation and patient-specific medical necessity. Results vary; not all patients qualify.
        </p>
      </div>
    )
  }

  // Full variant
  return (
    <div className="rounded-xl border border-[#1a1814] bg-[#0d0c0a] p-6 my-8">
      <h4 className="text-[12px] text-[#d8cfbe] font-semibold uppercase tracking-wider mb-3">Important Medication Information</h4>
      <div className="space-y-3 text-[11px] text-[#8a8268] leading-relaxed">
        <p>
          GLP-1 receptor agonist medications prescribed through {PRESCRIBING_ENTITY} are <strong className="text-[#d8cfbe]">compounded medications</strong> prepared by {PHARMACY_PARTNER_NAME}. <strong className="text-[#d8cfbe]">Compounded medications are not FDA-approved drugs.</strong> They are prepared for individual patients based on clinician-determined patient-specific medical necessity, in accordance with applicable state and federal compounding regulations.
        </p>
        <p>
          <strong className="text-[#d8cfbe]">Thyroid C-cell Warning:</strong> GLP-1 receptor agonists have caused thyroid C-cell tumors in animal studies. It is unknown whether this occurs in humans. Contraindicated in patients with a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN2).
        </p>
        <p>
          <strong className="text-[#d8cfbe]">Contraindications:</strong> History of pancreatitis, medullary thyroid carcinoma, MEN2, pregnancy, severe gastroparesis, or severe gastrointestinal disease.
        </p>
        <p>
          <strong className="text-[#d8cfbe]">Risks:</strong> Pancreatitis, gallbladder disease, gastroparesis, hypoglycemia (especially with insulin or sulfonylureas), gallstones, injection site reactions, nausea, and gastrointestinal effects.
        </p>
        <p>
          Individual results vary significantly. Not all patients qualify for treatment. Medical necessity must be determined by the prescribing physician. {PRESCRIBING_ENTITY} is the prescribing medical entity.
        </p>
      </div>
    </div>
  )
}
