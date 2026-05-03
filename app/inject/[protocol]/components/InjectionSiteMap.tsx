import { InjectionSite, InjectionRoute } from '@/lib/protocols/types';

interface InjectionSiteMapProps {
  sites: InjectionSite[];
  route: InjectionRoute;
}

function BodyFrontSVG({ sites }: { sites: InjectionSite[] }) {
  const siteIds = sites.map((s) => s.diagramId);
  const recommendedIds = sites.filter((s) => s.recommended).map((s) => s.diagramId);

  return (
    <svg viewBox="0 0 200 400" className="w-full h-auto max-h-[400px]" role="img" aria-labelledby="body-front-title body-front-desc">
      <title id="body-front-title">Front Body Injection Sites</title>
      <desc id="body-front-desc">Anatomical diagram showing recommended injection sites on the front of the body</desc>

      {/* Body outline */}
      <ellipse cx="100" cy="35" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Torso */}
      <path d="M72 55 L65 95 L60 180 L70 200 L80 200 L85 185 L100 185 L115 185 L120 200 L130 200 L140 180 L135 95 L128 55" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Arms */}
      <path d="M65 65 L50 90 L42 140 L38 180 L42 182 L48 140 L55 95" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M135 65 L150 90 L158 140 L162 180 L158 182 L152 140 L145 95" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Legs */}
      <path d="M75 200 L70 260 L68 320 L65 380 L75 382 L80 320 L82 260 L85 200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M115 200 L118 260 L120 320 L122 380 L132 382 L130 320 L128 260 L125 200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />

      {/* Deltoid markers */}
      {siteIds.includes('deltoid') && (
        <>
          <circle cx="52" cy="85" r="8" fill={recommendedIds.includes('deltoid') ? '#8a8268' : '#2a2620'} opacity="0.6" />
          <circle cx="148" cy="85" r="8" fill={recommendedIds.includes('deltoid') ? '#8a8268' : '#2a2620'} opacity="0.6" />
          <text x="52" y="88" textAnchor="middle" fontSize="6" fill="#f5ecd9" fontFamily="monospace">D</text>
          <text x="148" y="88" textAnchor="middle" fontSize="6" fill="#f5ecd9" fontFamily="monospace">D</text>
        </>
      )}

      {/* Abdomen markers */}
      {siteIds.includes('abdomen') && (
        <>
          <ellipse cx="88" cy="150" rx="10" ry="14" fill={recommendedIds.includes('abdomen') ? '#8a8268' : '#2a2620'} opacity="0.6" />
          <ellipse cx="112" cy="150" rx="10" ry="14" fill={recommendedIds.includes('abdomen') ? '#8a8268' : '#2a2620'} opacity="0.6" />
          <text x="100" y="154" textAnchor="middle" fontSize="6" fill="#f5ecd9" fontFamily="monospace">A</text>
          {/* Navel exclusion zone */}
          <circle cx="100" cy="145" r="5" fill="none" stroke="#f5ecd9" strokeWidth="0.5" strokeDasharray="2 1" opacity="0.4" />
        </>
      )}

      {/* Thigh markers */}
      {(siteIds.includes('vastus-lateralis') || siteIds.includes('thigh-anterior')) && (
        <>
          <ellipse cx="78" cy="280" rx="7" ry="20" fill={recommendedIds.includes('vastus-lateralis') || recommendedIds.includes('thigh-anterior') ? '#8a8268' : '#2a2620'} opacity="0.6" />
          <ellipse cx="122" cy="280" rx="7" ry="20" fill={recommendedIds.includes('vastus-lateralis') || recommendedIds.includes('thigh-anterior') ? '#8a8268' : '#2a2620'} opacity="0.6" />
          <text x="78" y="284" textAnchor="middle" fontSize="6" fill="#f5ecd9" fontFamily="monospace">T</text>
          <text x="122" y="284" textAnchor="middle" fontSize="6" fill="#f5ecd9" fontFamily="monospace">T</text>
        </>
      )}

      {/* Upper arm markers */}
      {siteIds.includes('upper-arm') && (
        <>
          <ellipse cx="45" cy="120" rx="5" ry="10" fill={recommendedIds.includes('upper-arm') ? '#8a8268' : '#2a2620'} opacity="0.6" />
          <ellipse cx="155" cy="120" rx="5" ry="10" fill={recommendedIds.includes('upper-arm') ? '#8a8268' : '#2a2620'} opacity="0.6" />
          <text x="45" y="124" textAnchor="middle" fontSize="6" fill="#f5ecd9" fontFamily="monospace">U</text>
          <text x="155" y="124" textAnchor="middle" fontSize="6" fill="#f5ecd9" fontFamily="monospace">U</text>
        </>
      )}
    </svg>
  );
}

function BodyBackSVG({ sites }: { sites: InjectionSite[] }) {
  const siteIds = sites.map((s) => s.diagramId);
  const recommendedIds = sites.filter((s) => s.recommended).map((s) => s.diagramId);

  return (
    <svg viewBox="0 0 200 400" className="w-full h-auto max-h-[400px]" role="img" aria-labelledby="body-back-title body-back-desc">
      <title id="body-back-title">Rear Body Injection Sites</title>
      <desc id="body-back-desc">Anatomical diagram showing recommended injection sites on the back of the body</desc>

      {/* Body outline - back view */}
      <ellipse cx="100" cy="35" rx="18" ry="22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M72 55 L65 95 L60 180 L70 200 L80 200 L85 185 L100 185 L115 185 L120 200 L130 200 L140 180 L135 95 L128 55" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M65 65 L50 90 L42 140 L38 180 L42 182 L48 140 L55 95" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M135 65 L150 90 L158 140 L162 180 L158 182 L152 140 L145 95" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M75 200 L70 260 L68 320 L65 380 L75 382 L80 320 L82 260 L85 200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M115 200 L118 260 L120 320 L122 380 L132 382 L130 320 L128 260 L125 200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />

      {/* Ventrogluteal markers */}
      {siteIds.includes('ventrogluteal') && (
        <>
          <ellipse cx="75" cy="195" rx="10" ry="8" fill={recommendedIds.includes('ventrogluteal') ? '#8a8268' : '#2a2620'} opacity="0.6" />
          <ellipse cx="125" cy="195" rx="10" ry="8" fill={recommendedIds.includes('ventrogluteal') ? '#8a8268' : '#2a2620'} opacity="0.6" />
          <text x="75" y="198" textAnchor="middle" fontSize="6" fill="#f5ecd9" fontFamily="monospace">VG</text>
          <text x="125" y="198" textAnchor="middle" fontSize="6" fill="#f5ecd9" fontFamily="monospace">VG</text>
        </>
      )}

      {/* Dorsogluteal markers */}
      {siteIds.includes('dorsogluteal') && (
        <>
          <ellipse cx="82" cy="210" rx="8" ry="7" fill="#2a2620" opacity="0.6" />
          <ellipse cx="118" cy="210" rx="8" ry="7" fill="#2a2620" opacity="0.6" />
          <text x="82" y="213" textAnchor="middle" fontSize="5" fill="#a89878" fontFamily="monospace">DG</text>
          <text x="118" y="213" textAnchor="middle" fontSize="5" fill="#a89878" fontFamily="monospace">DG</text>
          {/* Caution indicator */}
          <text x="100" y="225" textAnchor="middle" fontSize="5" fill="#a89878" opacity="0.6" fontFamily="monospace">caution</text>
        </>
      )}
    </svg>
  );
}

export function InjectionSiteMap({ sites, route }: InjectionSiteMapProps) {
  const hasBackSites = sites.some((s) => ['ventrogluteal', 'dorsogluteal'].includes(s.diagramId));

  return (
    <section className="bg-graphite-950 py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow mb-3">Step 2</p>
        <h2 className="text-headline text-champagne mb-2">Injection Sites</h2>
        <p className="text-brass/70 text-sm mb-8">
          {route === 'IM'
            ? 'Select an intramuscular injection site from the recommended locations below.'
            : 'Select a subcutaneous injection site from the recommended locations below.'}
        </p>

        <div className={`grid gap-8 mb-8 ${hasBackSites ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-xs mx-auto'}`}>
          <div className="text-brass/60">
            <p className="text-xs font-mono text-brass mb-2 text-center">FRONT</p>
            <BodyFrontSVG sites={sites} />
          </div>
          {hasBackSites && (
            <div className="text-brass/60">
              <p className="text-xs font-mono text-brass mb-2 text-center">REAR</p>
              <BodyBackSVG sites={sites} />
            </div>
          )}
        </div>

        {/* Site legend */}
        <div className="grid gap-3 sm:grid-cols-2">
          {sites.map((site) => (
            <div
              key={site.diagramId}
              className={`p-4 rounded border ${
                site.recommended
                  ? 'border-brass/40 bg-ink'
                  : 'border-steel/30 bg-ink/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${site.recommended ? 'bg-brass' : 'bg-steel'}`} />
                <h4 className="text-sm text-champagne font-medium">{site.name}</h4>
                {site.recommended && (
                  <span className="text-[10px] font-mono text-brass uppercase ml-auto">Recommended</span>
                )}
              </div>
              <p className="text-xs text-brass/60 mb-1">{site.anatomicalLocation}</p>
              <p className="text-xs text-brass/50 leading-relaxed">{site.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
