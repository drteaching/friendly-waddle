'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApi, Patient, PatientConsent, JourneyEvent } from '@/lib/hooks';

/** Fallback data used when the API is unavailable or patient not found. */
const mockPatient = {
  name: 'Sarah Mitchell',
  dateOfBirth: '1991-04-17',
  diagnosisDate: '2019-08-03',
  currentProviders: ['Dr A. Nguyen (Gynaecologist)', 'Dr R. Patel (Pain Specialist)'],
  recentEvents: [
    { date: '2025-11-18', title: 'Diagnostic laparoscopy with biopsy' },
    { date: '2025-09-05', title: 'MRI pelvis' },
    { date: '2025-07-22', title: 'Consultation — pain management review' },
  ],
  consentsGranted: 3,
  consentsTotal: 5,
};

const PATIENT_ID_KEY = 'passport_patient_id';

export default function PassportPage() {
  const [patientId, setPatientId] = useState<string | null>(null);
  const [lookupValue, setLookupValue] = useState('');

  // Restore stored patient ID on mount
  useEffect(() => {
    const stored = localStorage.getItem(PATIENT_ID_KEY);
    if (stored) setPatientId(stored);
  }, []);

  const {
    data: patient,
    loading,
    error,
  } = useApi<Patient>(patientId ? `/patient-passport/patients/${patientId}/passport` : null);

  // Derive display values — use API data when available, mock otherwise
  const useMock = !patient || !!error;

  const displayName = useMock
    ? mockPatient.name
    : `${patient.givenName} ${patient.familyName}`;

  const displayDob = useMock ? mockPatient.dateOfBirth : patient.dateOfBirth;
  const displayDiagnosisDate = useMock
    ? mockPatient.diagnosisDate
    : patient.diagnosisDate ?? 'Not recorded';

  const displayProviders = useMock
    ? mockPatient.currentProviders
    : patient.currentProviders ?? [];

  const displayEvents = useMock
    ? mockPatient.recentEvents
    : (patient.journeyTimeline ?? [])
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
        .map((e) => ({ date: e.date, title: e.title }));

  const consentsGranted = useMock ? mockPatient.consentsGranted : mockPatient.consentsGranted;
  const consentsTotal = useMock ? mockPatient.consentsTotal : mockPatient.consentsTotal;

  // ── Patient lookup form (shown when no ID is stored) ──────
  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    const id = lookupValue.trim();
    if (!id) return;
    localStorage.setItem(PATIENT_ID_KEY, id);
    setPatientId(id);
  }

  function handleClearPatient() {
    localStorage.removeItem(PATIENT_ID_KEY);
    setPatientId(null);
    setLookupValue('');
  }

  if (!patientId) {
    return (
      <div className="mx-auto max-w-md space-y-6 pt-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Endo Passport</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter your Patient ID to view your passport.
          </p>
        </div>
        <form onSubmit={handleLookup} className="space-y-4">
          <input
            type="text"
            value={lookupValue}
            onChange={(e) => setLookupValue(e.target.value)}
            placeholder="Patient ID"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
          >
            Load Passport
          </button>
        </form>
        <p className="text-center text-xs text-gray-400">
          Don&apos;t have a Patient ID?{' '}
          <button
            type="button"
            onClick={() => {
              setPatientId('demo');
              localStorage.setItem(PATIENT_ID_KEY, 'demo');
            }}
            className="text-teal-600 underline hover:text-teal-800"
          >
            View demo passport
          </button>
        </p>
      </div>
    );
  }

  // ── Loading state ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center space-y-3">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />
          <p className="text-sm text-gray-500">Loading your passport…</p>
        </div>
      </div>
    );
  }

  // ── Main passport view ────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {displayName}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Your Endo Passport gives you a clear view of your endometriosis
            journey and puts you in control of your health data.
          </p>
          {useMock && patientId !== 'demo' && (
            <p className="mt-1 text-xs text-amber-600">
              Could not load data from the server — showing sample data.
            </p>
          )}
        </div>
        <button
          onClick={handleClearPatient}
          className="shrink-0 text-xs text-gray-400 hover:text-gray-600 underline"
        >
          Switch patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overview card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">My Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <span className="text-gray-500">Date of Birth</span>
              <p className="font-medium">{displayDob}</p>
            </div>
            <div>
              <span className="text-gray-500">Diagnosis Date</span>
              <p className="font-medium">{displayDiagnosisDate}</p>
            </div>
            <div>
              <span className="text-gray-500">Current Providers</span>
              {displayProviders.length > 0 ? (
                <ul className="mt-1 space-y-1">
                  {displayProviders.map((prov) => (
                    <li key={prov} className="font-medium">
                      {prov}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-gray-400">No providers recorded</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Consent summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Data Sharing Consents</CardTitle>
            <Link
              href="/passport/consents"
              className="text-xs text-teal-600 hover:text-teal-800"
            >
              Manage
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100">
                <span className="text-lg font-bold text-teal-700">
                  {consentsGranted}/{consentsTotal}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                You have granted {consentsGranted} of {consentsTotal}{' '}
                available data-sharing consents. You can change these at any
                time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent journey events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Journey Events</CardTitle>
          <Link
            href="/passport/timeline"
            className="text-xs text-teal-600 hover:text-teal-800"
          >
            View Full Timeline
          </Link>
        </CardHeader>
        <CardContent>
          {displayEvents.length > 0 ? (
            <div className="space-y-3">
              {displayEvents.map((evt) => (
                <div
                  key={evt.date + evt.title}
                  className="flex items-center justify-between rounded-md border px-4 py-3"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {evt.title}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {evt.date}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No events recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
