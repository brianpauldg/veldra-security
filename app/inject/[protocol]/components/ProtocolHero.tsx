import { ProtocolContent } from '@/lib/protocols/types';

interface ProtocolHeroProps {
  protocol: ProtocolContent;
}

export function ProtocolHero({ protocol }: ProtocolHeroProps) {
  const routeLabel = protocol.route === 'IM' ? 'Intramuscular Injection' : 'Subcutaneous Injection';
  const reviewDate = new Date(protocol.physicianReviewedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="relative bg-[#020202] pt-12 pb-16 px-6 md:px-12 border-b border-steel">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-champagne">
              <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1" />
              <circle cx="14" cy="14" r="4" fill="currentColor" />
            </svg>
            <span className="text-champagne text-sm font-light tracking-wide">Bloom Metabolics</span>
          </div>
          <span className="eyebrow hidden sm:block">EST MMXXVI</span>
        </div>

        <p className="eyebrow mb-4">{protocol.route} Protocol</p>

        <h1 className="text-display-sm md:text-display text-champagne mb-4">
          {protocol.medication}, {routeLabel}
        </h1>

        <p className="text-brass italic font-display text-lg mb-8">
          Your injection guide
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-brass/60">
          <span>Reviewed {reviewDate}</span>
          <span className="hidden sm:inline">·</span>
          <span>Version {protocol.contentVersion}</span>
          <span className="hidden sm:inline">·</span>
          <span>Bloom Metabolics Clinical Team</span>
        </div>
      </div>
    </section>
  );
}
