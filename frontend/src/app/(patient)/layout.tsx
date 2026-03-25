import Link from 'next/link';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/40 to-white">
      {/* Patient-facing header */}
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-4xl items-centre justify-between px-4">
          <Link href="/passport" className="flex items-centre gap-2">
            <span className="text-lg font-bold text-teal-700">My Endo Passport</span>
          </Link>
          <nav className="flex items-centre gap-4 text-sm">
            <Link
              href="/passport/timeline"
              className="text-gray-600 hover:text-teal-700 transition-colours"
            >
              Timeline
            </Link>
            <Link
              href="/passport/consents"
              className="text-gray-600 hover:text-teal-700 transition-colours"
            >
              Consents
            </Link>
            <Link
              href="/login"
              className="text-gray-400 hover:text-gray-600 transition-colours"
            >
              Sign Out
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>

      {/* Simple footer */}
      <footer className="border-t bg-white py-6">
        <div className="mx-auto max-w-4xl px-4 text-centre text-xs text-gray-400">
          ASPIRE EndoExpertise Platform &mdash; Your health data, your control.
        </div>
      </footer>
    </div>
  );
}
