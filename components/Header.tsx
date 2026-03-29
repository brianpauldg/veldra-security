import Link from 'next/link'

export default function Header() {
  return (
    <header className="vd-header">
      <div className="vd-logo">
        <div className="vd-mark">V</div>
        <div className="vd-title">
          <div className="vd-name">Veldra</div>
          <div className="vd-sub">Compliance & client management</div>
        </div>
      </div>
      <nav className="vd-nav">
        <a className="vd-btn" href="https://cal.com/brian-deguzman" target="_blank" rel="noopener noreferrer">Book demo</a>
        <Link className="vd-btn vd-primary" href="/signup">Start Free Trial</Link>
      </nav>
    </header>
  )
}
