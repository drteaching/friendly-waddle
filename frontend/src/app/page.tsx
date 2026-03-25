import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-teal-800 mb-4">
          ASPIRE EndoExpertise Platform
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Credentialing endometriosis care providers, tracking outcomes, coordinating
          multidisciplinary networks, and empowering patients across the Asia-Pacific region.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md bg-teal-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 transition-colors"
          >
            Provider Dashboard
          </Link>
          <Link
            href="/patient"
            className="inline-flex items-center justify-center rounded-md border border-teal-600 px-6 py-3 text-sm font-medium text-teal-700 shadow-sm hover:bg-teal-50 transition-colors"
          >
            Patient Passport
          </Link>
        </div>
      </div>
    </main>
  );
}
