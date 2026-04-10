'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/trading', label: 'Crypto' },
  { href: '/options', label: 'Options' },
];

export function Nav() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  return (
    <nav style={{ display: 'flex', gap: 2, marginBottom: 16, borderBottom: '1px solid #27272a', paddingBottom: 12 }}>
      <Link href="/" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.78rem', padding: '6px 10px', marginRight: 8 }}>
        Home
      </Link>
      {links.map((link) => (
        <Link key={link.href} href={link.href} style={{
          padding: '6px 14px', borderRadius: 6, textDecoration: 'none',
          fontSize: '0.78rem', fontWeight: 500,
          background: pathname === link.href ? '#27272a' : 'transparent',
          color: pathname === link.href ? '#fafafa' : '#71717a',
        }}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
