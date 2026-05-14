interface EscalationCardProps {
  portalUrl?: string;
  clinicPhone?: string;
}

export function EscalationCard({
  portalUrl = process.env.NEXT_PUBLIC_PATIENT_PORTAL_URL || 'https://portal.bloommetabolics.com',
  clinicPhone = process.env.NEXT_PUBLIC_CLINIC_PHONE || '(888) 000-0000',
}: EscalationCardProps) {
  return (
    <section className="bg-ink py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="border-2 border-brass/40 rounded-lg p-8 bg-zinc-950">
          <h2 className="text-headline text-champagne mb-6">Need help right now</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded border border-steel/30 hover:border-brass/40 transition-colors text-center group"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="mx-auto mb-2 text-brass group-hover:text-champagne transition-colors">
                <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 7l9 5 9-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <p className="text-sm text-champagne/80">Message Care Team</p>
              <p className="text-xs text-brass/50 mt-1">Patient Portal</p>
            </a>

            <a
              href={`tel:${clinicPhone.replace(/[^+\d]/g, '')}`}
              className="block p-4 rounded border border-steel/30 hover:border-brass/40 transition-colors text-center group"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="mx-auto mb-2 text-brass group-hover:text-champagne transition-colors">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <p className="text-sm text-champagne/80">Call Clinic</p>
              <p className="text-xs text-brass/50 mt-1">{clinicPhone}</p>
            </a>

            <div className="p-4 rounded border border-steel/30 text-center">
              <svg width="24" height="24" viewBox="0 0 24 24" className="mx-auto mb-2 text-brass/60">
                <path d="M12 9v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <p className="text-sm text-champagne/80">Emergency</p>
              <p className="text-xs text-brass/50 mt-1">Call 911</p>
            </div>
          </div>

          <p className="text-xs text-brass/40 mt-6 text-center">
            If you are experiencing a medical emergency, call 911 immediately. Do not delay emergency care to contact your clinic.
          </p>
        </div>
      </div>
    </section>
  );
}
