import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROTOCOLS, VALID_SLUGS } from '@/lib/protocols';
import { ProtocolHero } from './components/ProtocolHero';
import { SyringeIdentifier } from './components/SyringeIdentifier';
import { InjectionSiteMap } from './components/InjectionSiteMap';
import { AngleGuide } from './components/AngleGuide';
import { VideoPlayer } from './components/VideoPlayer';
import { RotationTracker } from './components/RotationTracker';
import { Troubleshooting } from './components/Troubleshooting';
import { AcknowledgmentForm } from './components/AcknowledgmentForm';
import { EscalationCard } from './components/EscalationCard';
import { Disclaimer } from './components/Disclaimer';

interface PageProps {
  params: { protocol: string };
}

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ protocol: slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const protocol = PROTOCOLS[params.protocol];
  if (!protocol) return {};

  const routeLabel = protocol.route === 'IM' ? 'Intramuscular' : 'Subcutaneous';
  const title = `${protocol.medication} ${routeLabel} Injection Guide`;
  const description = `Patient injection education for ${protocol.medication} (${routeLabel}). Step-by-step technique, site rotation, and troubleshooting from Bloom Metabolics.`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Bloom Metabolics',
    },
    other: {
      'medical-audience': 'Patient',
    },
  };
}

function JsonLd({ protocol }: { protocol: typeof PROTOCOLS[string] }) {
  const routeLabel = protocol.route === 'IM' ? 'Intramuscular' : 'Subcutaneous';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `${protocol.medication} ${routeLabel} Injection Guide`,
    description: `Patient injection education for ${protocol.medication}`,
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient',
    },
    lastReviewed: protocol.physicianReviewedDate,
    reviewedBy: {
      '@type': 'Physician',
      name: `${protocol.physicianName}, ${protocol.physicianCredentials}`,
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'Bloom Metabolics',
      url: 'https://bloommetabolics.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ProtocolPage({ params }: PageProps) {
  const protocol = PROTOCOLS[params.protocol];

  if (!protocol) {
    notFound();
  }

  return (
    <>
      <JsonLd protocol={protocol} />
      <main className="print:bg-white">
        <ProtocolHero protocol={protocol} />
        <SyringeIdentifier protocol={protocol} />
        <InjectionSiteMap sites={protocol.sites} route={protocol.route} />
        <AngleGuide protocol={protocol} />
        <VideoPlayer protocol={protocol} />
        <RotationTracker protocol={protocol} />
        <Troubleshooting items={protocol.troubleshooting} />
        <EscalationCard />
        <AcknowledgmentForm protocol={protocol.slug} />

        {/* Storage and frequency notes */}
        <section className="bg-ink py-8 px-6 md:px-12">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded border border-steel/20 bg-[#020202]">
              <p className="text-xs font-mono text-brass mb-2">STORAGE</p>
              <p className="text-sm text-champagne/70">{protocol.storageNote}</p>
            </div>
            <div className="p-4 rounded border border-steel/20 bg-[#020202]">
              <p className="text-xs font-mono text-brass mb-2">FREQUENCY</p>
              <p className="text-sm text-champagne/70">{protocol.frequencyNote}</p>
            </div>
          </div>
        </section>

        <Disclaimer protocol={protocol} />
      </main>
    </>
  );
}
