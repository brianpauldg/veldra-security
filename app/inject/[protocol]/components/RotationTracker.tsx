'use client';

import { ProtocolContent } from '@/lib/protocols/types';

interface RotationTrackerProps {
  protocol: ProtocolContent;
}

export function RotationTracker({ protocol }: RotationTrackerProps) {
  const weeks = protocol.route === 'IM' ? 8 : 4;
  const siteNames = protocol.sites.filter((s) => s.recommended).map((s) => s.name);

  function handlePrint() {
    window.print();
  }

  return (
    <section className="bg-ink py-12 px-6 md:px-12 print:bg-white print:py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 print:mb-4">
          <div>
            <p className="eyebrow mb-3 print:text-black print:text-xs">Site Rotation</p>
            <h2 className="text-headline text-champagne print:text-black">Rotation Tracker</h2>
          </div>
          <button
            onClick={handlePrint}
            className="text-xs font-mono text-brass border border-brass/30 px-3 py-1.5 rounded hover:bg-brass/10 transition-colors print:hidden"
          >
            Print This Page
          </button>
        </div>

        <p className="text-brass/70 text-sm mb-6 print:text-gray-600 print:text-xs">
          {protocol.rotation.cadence}. {protocol.rotation.pattern}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse print:text-xs">
            <thead>
              <tr className="border-b border-steel/30 print:border-gray-300">
                <th className="text-left py-2 pr-4 text-brass font-mono text-xs print:text-gray-500">Week</th>
                <th className="text-left py-2 pr-4 text-brass font-mono text-xs print:text-gray-500">Site</th>
                <th className="text-left py-2 pr-4 text-brass font-mono text-xs print:text-gray-500">Side</th>
                <th className="text-left py-2 pr-4 text-brass font-mono text-xs print:text-gray-500">Date</th>
                <th className="text-left py-2 text-brass font-mono text-xs print:text-gray-500">Notes</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: weeks }, (_, i) => (
                <tr key={i} className="border-b border-steel/10 print:border-gray-200">
                  <td className="py-3 pr-4 text-champagne/80 font-mono print:text-black">{i + 1}</td>
                  <td className="py-3 pr-4 text-brass/50 print:text-gray-400">
                    {siteNames[i % siteNames.length]}
                  </td>
                  <td className="py-3 pr-4 text-brass/50 print:text-gray-400">
                    {i % 2 === 0 ? 'Left' : 'Right'}
                  </td>
                  <td className="py-3 pr-4 print:text-gray-400">
                    <span className="inline-block w-24 border-b border-dashed border-steel/30 print:border-gray-300">&nbsp;</span>
                  </td>
                  <td className="py-3 print:text-gray-400">
                    <span className="inline-block w-32 border-b border-dashed border-steel/30 print:border-gray-300">&nbsp;</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-brass/40 mt-4 print:text-gray-400">
          Fill in the date and any observations (soreness, bleeding, etc.) after each injection.
        </p>
      </div>
    </section>
  );
}
