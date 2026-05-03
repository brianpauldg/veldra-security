// FTC Health Products Compliance Guidance — editorial transparency
interface EditorialDisclosureProps {
  variant: 'prominent' | 'inline'
  lastReviewed?: string
}

export default function EditorialDisclosure({ variant, lastReviewed }: EditorialDisclosureProps) {
  if (variant === 'inline') {
    return (
      <span className="text-[10px] text-[#8a8268] italic">
        Published by Bloom Metabolics.
      </span>
    )
  }

  return (
    <div className="rounded-xl border border-[#1a1814] bg-[#0d0c0a] px-6 py-4 mb-8">
      <p className="text-[12px] text-[#d8cfbe] leading-relaxed">
        <strong>Editorial Disclosure:</strong> This guide is published by Bloom Metabolics. We&apos;ve described our own services alongside other options patients may consider. We may revise this content as the market evolves.
        {lastReviewed && (
          <span className="text-[#8a8268]"> Last reviewed: {lastReviewed}.</span>
        )}
      </p>
    </div>
  )
}
