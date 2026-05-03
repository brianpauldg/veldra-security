import { ProtocolContent } from '@/lib/protocols/types';

interface AngleGuideProps {
  protocol: ProtocolContent;
}

function NeedleCrossSectionSVG({ degrees, route, pinch }: { degrees: 45 | 90; route: 'IM' | 'SubQ'; pinch: boolean }) {
  const isIM = route === 'IM';
  const needleEndX = degrees === 90 ? 100 : 75;
  const needleEndY = degrees === 90 ? 25 : 35;

  return (
    <svg viewBox="0 0 200 120" className="w-full h-auto" role="img" aria-labelledby="angle-title angle-desc">
      <title id="angle-title">Injection Angle Guide — {degrees} degrees</title>
      <desc id="angle-desc">Cross-section diagram showing the correct {degrees}-degree needle insertion angle for {route === 'IM' ? 'intramuscular' : 'subcutaneous'} injection</desc>

      {/* Skin surface */}
      <rect x="10" y="55" width="180" height="4" fill="#d8cfbe" opacity="0.3" rx="2" />
      <text x="195" y="58" fontSize="6" fill="#d8cfbe" opacity="0.5" textAnchor="end" fontFamily="monospace">SKIN</text>

      {/* Subcutaneous fat layer */}
      <rect x="10" y="59" width="180" height="20" fill="#8a8268" opacity="0.15" />
      <text x="195" y="72" fontSize="6" fill="#8a8268" opacity="0.5" textAnchor="end" fontFamily="monospace">FAT</text>

      {/* Muscle layer */}
      <rect x="10" y="79" width="180" height="30" fill="#8a8268" opacity="0.08" />
      <text x="195" y="97" fontSize="6" fill="#8a8268" opacity="0.4" textAnchor="end" fontFamily="monospace">MUSCLE</text>

      {/* Target depth indicator */}
      {isIM ? (
        <line x1="100" y1="85" x2="100" y2="100" stroke="#8a8268" strokeWidth="6" opacity="0.3" strokeLinecap="round" />
      ) : (
        <line x1="100" y1="62" x2="100" y2="75" stroke="#8a8268" strokeWidth="6" opacity="0.3" strokeLinecap="round" />
      )}

      {/* Needle */}
      <line
        x1="100"
        y1={isIM ? 92 : 68}
        x2={needleEndX}
        y2={needleEndY}
        stroke="#f5ecd9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Syringe body */}
      <rect
        x={needleEndX - 5}
        y={needleEndY - 15}
        width="10"
        height="15"
        rx="2"
        fill="none"
        stroke="#f5ecd9"
        strokeWidth="1"
        transform={degrees === 45 ? `rotate(-45 ${needleEndX} ${needleEndY})` : ''}
      />

      {/* Angle arc */}
      {degrees === 90 ? (
        <>
          <path d="M 110 55 L 110 45 L 100 45" fill="none" stroke="#8a8268" strokeWidth="0.75" />
          <text x="113" y="50" fontSize="7" fill="#8a8268" fontFamily="monospace">90°</text>
        </>
      ) : (
        <>
          <path d="M 115 55 A 15 15 0 0 0 104 43" fill="none" stroke="#8a8268" strokeWidth="0.75" />
          <text x="117" y="48" fontSize="7" fill="#8a8268" fontFamily="monospace">45°</text>
        </>
      )}

      {/* Pinch indicators */}
      {pinch && (
        <>
          <path d="M 85 50 C 85 52 90 54 95 55" fill="none" stroke="#d8cfbe" strokeWidth="0.75" opacity="0.6" />
          <path d="M 115 50 C 115 52 110 54 105 55" fill="none" stroke="#d8cfbe" strokeWidth="0.75" opacity="0.6" />
          <text x="72" y="48" fontSize="5" fill="#d8cfbe" opacity="0.5" fontFamily="monospace">PINCH</text>
          <text x="118" y="48" fontSize="5" fill="#d8cfbe" opacity="0.5" fontFamily="monospace">PINCH</text>
        </>
      )}
    </svg>
  );
}

export function AngleGuide({ protocol }: AngleGuideProps) {
  return (
    <section className="bg-ink py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow mb-3">Step 3</p>
        <h2 className="text-headline text-champagne mb-2">Needle Angle</h2>
        <p className="text-brass/70 text-sm mb-8">
          {protocol.angle.technique}
        </p>

        <div className="max-w-md mx-auto mb-6 text-brass/60">
          <NeedleCrossSectionSVG
            degrees={protocol.angle.degrees}
            route={protocol.route}
            pinch={protocol.angle.pinchAndPoke}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto text-center">
          <div className="p-4 rounded border border-steel/30 bg-graphite-950">
            <p className="text-xs font-mono text-brass mb-1">ANGLE</p>
            <p className="text-champagne text-lg">{protocol.angle.degrees}°</p>
          </div>
          <div className="p-4 rounded border border-steel/30 bg-graphite-950">
            <p className="text-xs font-mono text-brass mb-1">SKIN PINCH</p>
            <p className="text-champagne text-lg">{protocol.angle.pinchAndPoke ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {!protocol.aspiration.required && (
          <div className="mt-6 p-4 rounded border border-steel/20 bg-graphite-950 max-w-lg mx-auto">
            <p className="text-xs font-mono text-brass mb-1">ASPIRATION</p>
            <p className="text-sm text-brass/70">{protocol.aspiration.rationale}</p>
          </div>
        )}
      </div>
    </section>
  );
}
