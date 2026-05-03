import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s — Bloom Metabolics Injection Guide',
    default: 'Injection Education — Bloom Metabolics',
  },
  description: 'Patient injection education and protocol guides from Bloom Metabolics.',
};

export default function InjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-graphite-950">
      {children}
    </div>
  );
}
