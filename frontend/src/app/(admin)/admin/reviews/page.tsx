'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  useAccreditationApplications,
  type AccreditationApplication,
} from '@/lib/hooks';

/** Fallback data shown when the API returns nothing. */
const mockApplications: AccreditationApplication[] = [
  {
    id: 'APP-2025-0042',
    organisationId: 'org-1',
    targetTier: 'EndoAdvanced',
    submittedAt: '2025-11-20',
    status: 'pending_review',
    overallScore: 74,
    createdAt: '2025-11-20',
  },
  {
    id: 'APP-2025-0039',
    organisationId: 'org-2',
    targetTier: 'EndoCentre',
    submittedAt: '2025-11-15',
    status: 'in_progress',
    overallScore: 92,
    createdAt: '2025-11-15',
  },
  {
    id: 'APP-2025-0035',
    organisationId: 'org-3',
    targetTier: 'EndoAware',
    submittedAt: '2025-11-08',
    status: 'pending_review',
    overallScore: 75,
    createdAt: '2025-11-08',
  },
];

const statusColours: Record<string, string> = {
  pending_review: 'bg-amber-100 text-amber-800',
  in_progress: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function AdminReviewsPage() {
  const { data, loading, error, refetch } = useAccreditationApplications();

  const applications =
    data && data.length > 0 ? data : mockApplications;

  const pendingCount = applications.filter(
    (a) => a.status === 'pending_review',
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-gray-500">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-700">
          Failed to load applications: {error}
        </p>
        <Button variant="outline" size="sm" className="mt-3" onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Accreditation Review Queue
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and assess submitted accreditation applications.
          </p>
        </div>
        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
          {pendingCount} Awaiting Review
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
                  <th className="pb-2 pr-4 font-medium">Target Tier</th>
                  <th className="pb-2 pr-4 font-medium">Submitted</th>
                  <th className="pb-2 pr-4 font-medium">Score</th>
                  <th className="pb-2 pr-4 font-medium">Status</th>
                  <th className="pb-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="py-3 pr-4 font-medium text-teal-700">
                      {app.id}
                    </td>
                    <td className="py-3 pr-4">{app.targetTier}</td>
                    <td className="py-3 pr-4">
                      {app.submittedAt
                        ? new Date(app.submittedAt).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="py-3 pr-4">
                      {app.overallScore != null ? `${app.overallScore}%` : '-'}
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
                      <Link href={`/admin/reviews/${app.id}`}>
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </Link>
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
