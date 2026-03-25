import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

/** Placeholder CPD data — will be fetched from the API. */
const mockCpdSummary = {
  earned: 42,
  required: 60,
  cycleEnd: '2026-06-30',
};

const mockActivities = [
  {
    id: 'CPD-001',
    title: 'Advanced Laparoscopic Techniques Workshop',
    category: 'Educational Activity',
    hours: 8,
    date: '2025-10-15',
    ranzcogMapped: true,
  },
  {
    id: 'CPD-002',
    title: 'MDT Case Review — Complex Endometriosis',
    category: 'Practice Review',
    hours: 2,
    date: '2025-11-01',
    ranzcogMapped: true,
  },
  {
    id: 'CPD-003',
    title: '#Enzian Classification Training Module',
    category: 'Self-Directed Learning',
    hours: 4,
    date: '2025-11-10',
    ranzcogMapped: false,
  },
  {
    id: 'CPD-004',
    title: 'ASPIRE Network Annual Conference',
    category: 'Educational Activity',
    hours: 16,
    date: '2025-09-20',
    ranzcogMapped: true,
  },
  {
    id: 'CPD-005',
    title: 'Patient Outcomes Audit — PROMS Analysis',
    category: 'Measuring Outcomes',
    hours: 6,
    date: '2025-08-12',
    ranzcogMapped: true,
  },
  {
    id: 'CPD-006',
    title: 'Pelvic Pain Management Masterclass',
    category: 'Educational Activity',
    hours: 6,
    date: '2025-07-05',
    ranzcogMapped: true,
  },
];

export default function CpdPage() {
  const percentage = Math.round(
    (mockCpdSummary.earned / mockCpdSummary.required) * 100,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CPD Tracker</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track continuing professional development activities and RANZCOG CPD
            mapping.
          </p>
        </div>
        <Button>Log Activity</Button>
      </div>

      {/* Summary card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-500">Current Cycle Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockCpdSummary.earned}{' '}
                <span className="text-base font-normal text-gray-400">
                  / {mockCpdSummary.required} hours
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Cycle ends</p>
              <p className="text-sm font-medium">{mockCpdSummary.cycleEnd}</p>
            </div>
          </div>
          <Progress value={percentage} className="h-3" />
          <p className="mt-2 text-xs text-gray-500">{percentage}% complete</p>
        </CardContent>
      </Card>

      {/* Activities table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Logged Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-2 pr-4 font-medium">Activity</th>
                  <th className="pb-2 pr-4 font-medium">Category</th>
                  <th className="pb-2 pr-4 font-medium">Hours</th>
                  <th className="pb-2 pr-4 font-medium">Date</th>
                  <th className="pb-2 font-medium">RANZCOG</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="py-3 pr-4 font-medium text-gray-900">
                      {activity.title}
                    </td>
                    <td className="py-3 pr-4 text-gray-600">
                      {activity.category}
                    </td>
                    <td className="py-3 pr-4">{activity.hours}h</td>
                    <td className="py-3 pr-4">{activity.date}</td>
                    <td className="py-3">
                      <Badge
                        variant="secondary"
                        className={
                          activity.ranzcogMapped
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-500'
                        }
                      >
                        {activity.ranzcogMapped ? 'Mapped' : 'Pending'}
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
