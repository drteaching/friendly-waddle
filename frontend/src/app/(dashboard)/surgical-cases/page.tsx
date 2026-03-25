import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/** Placeholder surgical case data — will be fetched from the API. */
const mockCases = [
  {
    id: 'SC-2025-0108',
    date: '2025-12-02',
    procedure: 'Laparoscopic excision of deep infiltrating endometriosis',
    rASRM: 'Stage IV',
    enzianScore: 'P3 O2 T1 A1 B2 C0',
    patientRef: 'PT-4412',
    status: 'completed',
  },
  {
    id: 'SC-2025-0099',
    date: '2025-11-18',
    procedure: 'Diagnostic laparoscopy with biopsy',
    rASRM: 'Stage II',
    enzianScore: 'P1 O1 T0 A0 B0 C0',
    patientRef: 'PT-4398',
    status: 'awaiting_proms',
  },
  {
    id: 'SC-2025-0087',
    date: '2025-10-30',
    procedure: 'Robotic-assisted excision of rectovaginal endometriosis',
    rASRM: 'Stage IV',
    enzianScore: 'P3 O2 T2 A2 B3 C1',
    patientRef: 'PT-4371',
    status: 'completed',
  },
];

const statusColours: Record<string, string> = {
  completed: 'bg-green-100 text-green-800',
  awaiting_proms: 'bg-amber-100 text-amber-800',
  draft: 'bg-gray-100 text-gray-800',
};

export default function SurgicalCasesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Surgical Cases</h1>
        <Link
          href="/surgical-cases/new"
          className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-teal-700 transition-colors"
        >
          Log New Case
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Case Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-2 pr-4 font-medium">Case ID</th>
                  <th className="pb-2 pr-4 font-medium">Date</th>
                  <th className="pb-2 pr-4 font-medium">Procedure</th>
                  <th className="pb-2 pr-4 font-medium">#Enzian</th>
                  <th className="pb-2 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockCases.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="py-3 pr-4 font-medium text-teal-700">
                      <Link href={`/surgical-cases/${c.id}`}>{c.id}</Link>
                    </td>
                    <td className="py-3 pr-4">{c.date}</td>
                    <td className="py-3 pr-4 max-w-xs truncate">{c.procedure}</td>
                    <td className="py-3 pr-4 font-mono text-xs">{c.enzianScore}</td>
                    <td className="py-3 pr-4">
                      <Badge
                        variant="secondary"
                        className={statusColours[c.status] ?? ''}
                      >
                        {c.status.replace('_', ' ')}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
