import { ProtocolContent, SyringeType } from '@/lib/protocols/types';

interface SyringeIdentifierProps {
  protocol: ProtocolContent;
}

function InsulinSyringeSVG() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-auto" role="img" aria-labelledby="insulin-title insulin-desc">
      <title id="insulin-title">Insulin Syringe</title>
      <desc id="insulin-desc">A small syringe with a short, thin fixed needle typically used for subcutaneous injections</desc>
      {/* Barrel */}
      <rect x="40" y="20" width="120" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Plunger */}
      <rect x="155" y="24" width="40" height="12" rx="2" fill="currentColor" opacity="0.3" />
      <line x1="195" y1="22" x2="195" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Needle - short and thin */}
      <line x1="40" y1="30" x2="15" y2="30" stroke="currentColor" strokeWidth="1" />
      {/* Graduation marks */}
      {[50, 65, 80, 95, 110, 125, 140].map((x) => (
        <line key={x} x1={x} y1="20" x2={x} y2="25" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      ))}
      {/* Fixed needle hub */}
      <rect x="35" y="26" width="8" height="8" rx="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function IntramuscularSyringeSVG() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-auto" role="img" aria-labelledby="im-title im-desc">
      <title id="im-title">Intramuscular Syringe</title>
      <desc id="im-desc">A larger syringe with a longer, detachable needle used for intramuscular injections</desc>
      {/* Barrel - larger */}
      <rect x="50" y="16" width="110" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Plunger */}
      <rect x="155" y="22" width="35" height="16" rx="2" fill="currentColor" opacity="0.3" />
      <line x1="190" y1="18" x2="190" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Needle - longer */}
      <line x1="50" y1="30" x2="8" y2="30" stroke="currentColor" strokeWidth="1.5" />
      {/* Detachable hub */}
      <polygon points="50,24 50,36 42,33 42,27" fill="currentColor" opacity="0.4" />
      {/* Graduation marks */}
      {[60, 75, 90, 105, 120, 135, 150].map((x) => (
        <line key={x} x1={x} y1="16" x2={x} y2="23" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      ))}
    </svg>
  );
}

function SyringeCard({
  type,
  isActive,
  gauge,
  length,
  notes,
}: {
  type: SyringeType;
  isActive: boolean;
  gauge: string;
  length: string;
  notes: string;
}) {
  const label = type === 'insulin' ? 'Insulin Syringe' : 'Intramuscular Syringe';

  return (
    <div
      className={`relative rounded-lg p-6 transition-all ${
        isActive
          ? 'border-2 border-brass bg-ink'
          : 'border border-steel/40 bg-ink/40 opacity-40'
      }`}
    >
      {isActive && (
        <span className="absolute top-3 right-3 text-xs font-mono tracking-wider text-brass uppercase bg-brass/10 px-2 py-0.5 rounded">
          This Protocol
        </span>
      )}
      {!isActive && (
        <span className="absolute top-3 right-3 text-xs font-mono tracking-wider text-steel uppercase">
          Not for this medication
        </span>
      )}

      <h3 className={`text-lg font-display mb-4 ${isActive ? 'text-champagne' : 'text-steel'}`}>
        {label}
      </h3>

      <div className={isActive ? 'text-champagne' : 'text-steel'}>
        {type === 'insulin' ? <InsulinSyringeSVG /> : <IntramuscularSyringeSVG />}
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <p className={isActive ? 'text-champagne/80' : 'text-steel/60'}>
          <span className="text-brass font-mono text-xs">GAUGE</span> {gauge}
        </p>
        <p className={isActive ? 'text-champagne/80' : 'text-steel/60'}>
          <span className="text-brass font-mono text-xs">LENGTH</span> {length}
        </p>
        {isActive && (
          <p className="text-brass/70 text-xs mt-3 leading-relaxed">{notes}</p>
        )}
      </div>
    </div>
  );
}

export function SyringeIdentifier({ protocol }: SyringeIdentifierProps) {
  return (
    <section className="bg-ink py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow mb-3">Step 1</p>
        <h2 className="text-headline text-champagne mb-2">Identify Your Syringe</h2>
        <p className="text-brass/70 text-sm mb-8">
          Confirm you have the correct syringe type before preparing your injection.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <SyringeCard
            type="insulin"
            isActive={protocol.syringe.type === 'insulin'}
            gauge={protocol.syringe.type === 'insulin' ? protocol.syringe.gauge : '29g–31g'}
            length={protocol.syringe.type === 'insulin' ? protocol.syringe.length : '5/16" (8mm)'}
            notes={protocol.syringe.type === 'insulin' ? protocol.syringe.visualNotes : ''}
          />
          <SyringeCard
            type="intramuscular"
            isActive={protocol.syringe.type === 'intramuscular'}
            gauge={protocol.syringe.type === 'intramuscular' ? protocol.syringe.gauge : '23g–25g'}
            length={protocol.syringe.type === 'intramuscular' ? protocol.syringe.length : '1 inch'}
            notes={protocol.syringe.type === 'intramuscular' ? protocol.syringe.visualNotes : ''}
          />
        </div>
      </div>
    </section>
  );
}
