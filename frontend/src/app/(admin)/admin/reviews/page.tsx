import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/** Placeholder review queue data — will be fetched from the API. */
const mockApplications = [
  {
    id: 'APP-2025-0042',
    provider: 'Dr A. Nguyen',
    clinic: 'Royal Women\'s Hospital',
    tier: 'EndoAdvanced',
    submittedAt: '2025-11-20',
    status: 'pending_review',
    featuresMet: 28,
    featuresTotal: 38,
  },
  {
    id: 'APP-2025-0039',
    provider: 'Dr J. Chen',
    clinic: 'Westmead Endometriosis Centre',
    tier: 'EndoCentre',
    submittedAt: '2025-11-15',
    status: 'in_progress',
    featuresMet: 35,
    featuresTotal: 38,
  },
  {
    id: 'APP-2025-0035',
    provider: 'Dr S. Williams',
    clinic: 'Adelaide Women\'s Health',
    tier: 'EndoAware',
    submittedAt: '2025-11-08',
    status: 'pending_review',
    featuresMet: 15,
    featuresTotal: 20,
  },
];

const statusColours: Record<string, string> = {
  pending_review: 'bg-amber-100 text-amber-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-centre justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Accreditation Review Queue
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and assess submitted accreditation applications.
          </p>
        </div>
        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
          {mockApplications.filter((a) => a.status === 'pending_review').length}{' '}
          Awaiting Review
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-2 pr-4 font-medium">Application</th>
                  <th className="pb-2 pr-4 font-medium">Provider</th>
                  <th className="pb-2 pr-4 font-medium">Target Tier</th>
                  <th className="pb-2 pr-4 font-medium">Submitted</th>
                  <th className="pb-2 pr-4 font-medium">Features</th>
                  <th className="pb-2 pr-4 font-medium">Status</th>
                  <th className="pb-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="py-3 pr-4 font-medium text-teal-700">
                      {app.id}
                    </td>
                    <td className="py-3 pr-4">
                      <div>
                        <p className="font-medium">{app.provider}</p>
                        <p className="text-xs text-gray-400">{app.clinic}</p>
                      </div>
                    </td>
                    <td className="py-3 pr-4">{app.tier}</td>
                    <td className="py-3 pr-4">{app.submittedAt}</td>
                    <td className="py-3 pr-4">
                      {app.featuresMet}/{app.featuresTotal}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        variant="secondary"
                        className={statusColours[app.status] ?? ''}
                      >
                        {app.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
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
