import Link from 'next/link';

export default function ProtocolNotFound() {
  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-4">Protocol Not Found</p>
        <h1 className="text-display-sm text-champagne mb-6">
          This injection guide does not exist
        </h1>
        <p className="text-brass mb-8">
          The protocol you are looking for may have been moved or is not yet available.
          Please contact your care team for assistance.
        </p>
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full py-3 px-6 bg-graphite border border-steel text-champagne text-sm rounded hover:bg-steel transition-colors"
          >
            Return to Bloom Metabolics
          </Link>
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CLINIC_EMAIL || 'care@bloommetabolics.com'}`}
            className="block w-full py-3 px-6 border border-brass text-brass text-sm rounded hover:bg-brass/10 transition-colors"
          >
            Contact Care Team
          </a>
        </div>
      </div>
    </div>
  );
}
