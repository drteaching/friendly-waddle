import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/** Placeholder patient data — will be fetched from the API. */
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

export default function PassportPage() {
  const p = mockPatient;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {p.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Your Endo Passport gives you a clear view of your endometriosis
          journey and puts you in control of your health data.
        </p>
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
              <p className="font-medium">{p.dateOfBirth}</p>
            </div>
            <div>
              <span className="text-gray-500">Diagnosis Date</span>
              <p className="font-medium">{p.diagnosisDate}</p>
            </div>
            <div>
              <span className="text-gray-500">Current Providers</span>
              <ul className="mt-1 space-y-1">
                {p.currentProviders.map((prov) => (
                  <li key={prov} className="font-medium">
                    {prov}
                  </li>
                ))}
              </ul>
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
                  {p.consentsGranted}/{p.consentsTotal}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                You have granted {p.consentsGranted} of {p.consentsTotal}{' '}
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
          <div className="space-y-3">
            {p.recentEvents.map((evt) => (
              <div
                key={evt.date}
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
        </CardContent>
      </Card>
    </div>
  );
}
