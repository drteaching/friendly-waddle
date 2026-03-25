import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/** Placeholder MDT discussion data — will be fetched from the API. */
const mockDiscussions = [
  {
    id: 'MDT-2025-018',
    title: 'Complex rectovaginal endometriosis — multidisciplinary input required',
    patientRef: 'PT-4412',
    status: 'open',
    participants: 4,
    lastActivity: '2025-12-01',
  },
  {
    id: 'MDT-2025-015',
    title: 'Recurrent disease post-excision — fertility considerations',
    patientRef: 'PT-4371',
    status: 'resolved',
    participants: 6,
    lastActivity: '2025-11-22',
  },
  {
    id: 'MDT-2025-012',
    title: 'Adolescent presentation with chronic pelvic pain',
    patientRef: 'PT-4350',
    status: 'open',
    participants: 3,
    lastActivity: '2025-11-15',
  },
];

const statusColours: Record<string, string> = {
  open: 'bg-green-100 text-green-800',
  resolved: 'bg-gray-100 text-gray-600',
};

export default function CaseHubPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Hub</h1>
          <p className="mt-1 text-sm text-gray-500">
            Multidisciplinary team case discussions and collaborative care
            coordination.
          </p>
        </div>
        <Button>New Discussion</Button>
      </div>

      <div className="space-y-4">
        {mockDiscussions.map((discussion) => (
          <Card key={discussion.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-400">
                      {discussion.id}
                    </span>
                    <Badge
                      variant="secondary"
                      className={statusColours[discussion.status] ?? ''}
                    >
                      {discussion.status}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {discussion.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                    <span>Patient: {discussion.patientRef}</span>
                    <span>{discussion.participants} participants</span>
                    <span>Last activity: {discussion.lastActivity}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
