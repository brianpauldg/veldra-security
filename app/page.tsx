import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="vd-hero">
        <div className="vd-hero-left">
          <h1>Built for firms that demand security and simplicity</h1>
          <p className="vd-lead">Veldra helps compliance-focused teams manage clients, documents, and regulatory tasks — securely, without the noise. Reduce onboarding friction and keep control of sensitive data.</p>

          <div className="vd-hero-ctas">
            <Link className="vd-btn vd-primary" href="/signup">Start Free Trial</Link>
            <a className="vd-btn" href="https://cal.com/brian-deguzman" target="_blank" rel="noopener noreferrer">Book Demo</a>
          </div>
        </div>

        <div className="vd-hero-right">
          <div className="vd-preview">Preview — Clean dashboard UI</div>
        </div>
      </section>

      <section className="vd-features" aria-label="Key features">
      <div className="vd-card">
        <h3>Secure document storage</h3>
        <p className="vd-muted">AES-256-GCM encryption, private buckets, and fine-grained access controls.</p>
      </div>
      <div className="vd-card">
        <h3>Client & compliance workflows</h3>
        <p className="vd-muted">Built-in templates and audit logs to reduce overhead and demonstrate compliance.</p>
      </div>
      <div className="vd-card">
        <h3>Trusted integrations</h3>
        <p className="vd-muted">Stripe for billing, Supabase for storage/auth, and flexible APIs for automation.</p>
      </div>
    </section>
    </>
  )
}
