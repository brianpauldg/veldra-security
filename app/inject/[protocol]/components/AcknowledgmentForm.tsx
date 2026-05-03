'use client';

import { useState, useEffect } from 'react';
import { submitAcknowledgment } from '@/lib/acknowledgment/submit';

interface AcknowledgmentFormProps {
  protocol: string;
}

export function AcknowledgmentForm({ protocol }: AcknowledgmentFormProps) {
  const storageKey = `bloom-inject-ack-${protocol}`;
  const [acknowledged, setAcknowledged] = useState(false);
  const [checked, setChecked] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedTimestamp, setSavedTimestamp] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setSavedTimestamp(stored);
      setAcknowledged(true);
    }
  }, [storageKey]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!checked || !identifier.trim()) return;

    setSubmitting(true);
    setError(null);

    const result = await submitAcknowledgment({
      protocol,
      patientIdentifier: identifier.trim(),
      acknowledgedAt: new Date().toISOString(),
    });

    if (result.success) {
      localStorage.setItem(storageKey, result.timestamp);
      setSavedTimestamp(result.timestamp);
      setAcknowledged(true);
    } else {
      setError(
        'Acknowledgment could not be saved. Please screenshot this page and message your care team.'
      );
    }

    setSubmitting(false);
  }

  if (acknowledged && savedTimestamp) {
    const date = new Date(savedTimestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <section className="bg-ink py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="border border-brass/30 rounded-lg p-6 bg-graphite-950 text-center">
            <svg width="32" height="32" viewBox="0 0 32 32" className="mx-auto mb-3 text-brass">
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10 16l4 4 8-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-champagne font-display text-lg mb-1">Instructions Reviewed</p>
            <p className="text-brass/60 text-sm">{date}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ink py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow mb-3">Acknowledgment</p>
        <h2 className="text-headline text-champagne mb-6">Confirm Review</h2>

        <form onSubmit={handleSubmit} className="border border-steel/30 rounded-lg p-6 bg-graphite-950">
          <label className="flex items-start gap-3 cursor-pointer mb-6">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-steel bg-ink text-brass focus:ring-brass focus:ring-offset-0"
            />
            <span className="text-sm text-champagne/80 leading-relaxed">
              I have reviewed these injection instructions and understand how to safely administer my medication. I will contact my care team with any questions before injecting.
            </span>
          </label>

          <div className="mb-6">
            <label htmlFor="patient-id" className="block text-xs font-mono text-brass mb-2">
              Patient Email or ID
            </label>
            <input
              id="patient-id"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-ink border border-steel/30 rounded px-3 py-2 text-sm text-champagne placeholder:text-brass/30 focus:outline-none focus:border-brass/60"
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded border border-red-900/50 bg-red-950/20 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!checked || !identifier.trim() || submitting}
            className="w-full py-3 rounded bg-brass/20 border border-brass/40 text-brass text-sm font-medium hover:bg-brass/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          >
            {submitting ? 'Submitting...' : 'Confirm Review'}
          </button>
        </form>
      </div>
    </section>
  );
}
