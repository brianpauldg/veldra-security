import Image from 'next/image';
import { ProtocolContent, SyringeType } from '@/lib/protocols/types';

interface SyringeIdentifierProps {
  protocol: ProtocolContent;
}

const SYRINGE_IMAGES: Record<SyringeType, { src: string; alt: string }> = {
  insulin: {
    src: '/inject/syringes/insulin-syringe.png',
    alt: 'Insulin syringe with orange cap, short thin fixed needle, used for subcutaneous injections',
  },
  intramuscular: {
    src: '/inject/syringes/intramuscular-syringe.png',
    alt: 'Intramuscular syringe with blue hub, longer detachable needle, used for intramuscular injections',
  },
};

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

      <div className="relative w-full aspect-[3/1] my-2">
        <Image
          src={SYRINGE_IMAGES[type].src}
          alt={SYRINGE_IMAGES[type].alt}
          fill
          className={`object-contain ${!isActive ? 'opacity-40' : ''}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
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
