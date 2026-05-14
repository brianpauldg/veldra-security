import { ProtocolContent } from '@/lib/protocols/types';

interface DisclaimerProps {
  protocol: ProtocolContent;
}

export function Disclaimer({ protocol }: DisclaimerProps) {
  const reviewDate = new Date(protocol.physicianReviewedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="bg-zinc-950 py-12 px-6 md:px-12 border-t border-steel/20">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs text-brass/40 leading-relaxed mb-4">
          These instructions are provided for active Bloom Metabolics patients receiving care under
          medical supervision. Protocols are individualized based on your prescriber&#39;s evaluation.
          This content is educational and does not replace direct clinical guidance. Do not use these
          instructions to administer medications obtained outside of a physician-prescribed protocol.
          If you have questions about your specific protocol, contact your Bloom Metabolics care team
          before injecting.
        </p>

        <p className="text-xs text-brass/30">
          Content reviewed by {protocol.physicianName}, {protocol.physicianCredentials} on{' '}
          {reviewDate}. Version {protocol.contentVersion}.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 28 28" className="text-brass/30">
            <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="14" cy="14" r="4" fill="currentColor" />
          </svg>
          <span className="text-xs text-brass/30 tracking-wide">Bloom Metabolics</span>
        </div>
      </div>
    </section>
  );
}
