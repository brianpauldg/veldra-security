import { InjectionSite, InjectionRoute } from '@/lib/protocols/types';

interface InjectionSiteMapProps {
  sites: InjectionSite[];
  route: InjectionRoute;
}

export function InjectionSiteMap({ sites, route }: InjectionSiteMapProps) {
  return (
    <section className="bg-[#020202] py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow mb-3">Step 2</p>
        <h2 className="text-headline text-champagne mb-2">Injection Sites</h2>
        <p className="text-brass/70 text-sm mb-8">
          {route === 'IM'
            ? 'Select an intramuscular injection site from the recommended locations below.'
            : 'Select a subcutaneous injection site from the recommended locations below.'}
        </p>

        {/* Clinical injection site diagram */}
        <div className="rounded-lg border border-steel/30 bg-white p-4 md:p-6 max-w-lg mx-auto mb-8">
          <img
            src="/inject/diagrams/injection-sites.png"
            alt="Self-injection guide showing common subcutaneous (SubQ) and intramuscular (IM) injection sites. Front view: deltoid (IM), abdomen (SubQ), thigh (SubQ), vastus lateralis (IM). Back view: back of upper arm (SubQ), upper outer buttock (SubQ), ventrogluteal (IM)."
            className="w-full h-auto"
            width={800}
            height={1000}
          />
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
                {!site.recommended && (
                  <span className="text-[10px] font-mono text-steel uppercase ml-auto">Acceptable</span>
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
