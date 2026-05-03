// FTC Endorsement Guides — typical-results disclosure for testimonials
interface TestimonialDisclosureProps {
  variant?: 'general' | 'weight-loss' | 'hormone'
}

export default function TestimonialDisclosure({ variant = 'general' }: TestimonialDisclosureProps) {
  const text = variant === 'weight-loss'
    ? 'This is one patient\u2019s experience. Weight loss outcomes vary significantly by individual. Many patients see different results or no results. All treatment requires physician evaluation.'
    : variant === 'hormone'
    ? 'This is one patient\u2019s experience. Hormone therapy outcomes vary by individual. Many patients see different results. All treatment requires physician evaluation and lab monitoring.'
    : 'This is one patient\u2019s experience. Outcomes vary by individual; many patients see different results or no results.'

  return (
    <p className="text-[10px] text-[#8a8268] italic mt-2 leading-relaxed">
      {text}
    </p>
  )
}
