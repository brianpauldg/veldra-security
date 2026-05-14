'use client';

import { useState } from 'react';

interface TroubleshootingProps {
  items: { question: string; answer: string }[];
}

export function Troubleshooting({ items }: TroubleshootingProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="bg-zinc-950 py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow mb-3">Troubleshooting</p>
        <h2 className="text-headline text-champagne mb-8">Common Questions</h2>

        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="border border-steel/20 rounded overflow-hidden">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-ink/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm text-champagne/90 pr-4">{item.question}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className={`text-brass flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {openIndex === index && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-brass/70 leading-relaxed">
                    {item.answer}
                  </p>
                  <p className="text-xs text-brass/40 mt-3">
                    If symptoms persist or worsen, message your care team via the patient portal.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
