'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 to-white">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg border border-gray-100">
        {/* Branding */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-teal-700">
            ASPIRE
          </h1>
          <p className="mt-1 text-sm text-gray-500">EndoExpertise Platform</p>
          <p className="mt-4 text-base text-gray-600">
            Sign in to manage your accreditation, cases and continuing
            professional development.
          </p>
        </div>

        {/* Auth0 login button */}
        <div className="space-y-4">
          <a
            href="/api/auth/login"
            className="flex w-full items-center justify-center rounded-md bg-teal-600 px-4 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            Sign in with Auth0
          </a>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">or</span>
            </div>
          </div>

          <Link
            href="/passport"
            className="flex w-full items-center justify-center rounded-md border border-coral-300 px-4 py-3 text-sm font-medium text-coral-700 shadow-sm hover:bg-coral-50 transition-colors"
          >
            Access My Endo Passport
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">
          By signing in you agree to our{' '}
          <a href="#" className="underline hover:text-gray-600">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-gray-600">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
