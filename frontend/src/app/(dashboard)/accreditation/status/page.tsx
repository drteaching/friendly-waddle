import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/** Placeholder application data — will be fetched from the API. */
const mockApplication = {
  id: 'APP-2025-0042',
  tier: 'EndoAdvanced',
  status: 'under_review',
  submittedAt: '2025-11-20',
  domainScores: [
    { domain: 'Networks of Expertise', score: 3, max: 3 },
    { domain: 'Customer Service', score: 5, max: 7 },
    { domain: 'Organisation of Care', score: 7, max: 9 },
    { domain: 'Gynaecological Surgery', score: 6, max: 7 },
    { domain: 'Pain Management', score: 5, max: 7 },
    { domain: 'Fertility Treatment', score: 1, max: 2 },
    { domain: 'Training', score: 1, max: 1 },
    { domain: 'Research', score: 1, max: 2 },
  ],
};

const statusLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  draft: { label: 'Draft', variant: 'secondary' },
  submitted: { label: 'Submitted', variant: 'outline' },
  under_review: { label: 'Under Review', variant: 'default' },
  approved: { label: 'Approved', variant: 'default' },
  revisions_requested: { label: 'Revisions Requested', variant: 'destructive' },
};

export default function AccreditationStatusPage() {
  const app = mockApplication;
  const statusInfo = statusLabels[app.status] ?? { label: app.status, variant: 'secondary' as const };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Application Status</h1>
        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Application {app.id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Target Tier</span>
              <p className="font-medium text-teal-700">{app.tier}</p>
            </div>
            <div>
              <span className="text-gray-500">Submitted</span>
              <p className="font-medium">{app.submittedAt}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Domain scores overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Domain Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {app.domainScores.map((d) => {
              const pct = Math.round((d.score / d.max) * 100);
              return (
                <div key={d.domain}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{d.domain}</span>
                    <span className="text-gray-500">
                      {d.score}/{d.max}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
