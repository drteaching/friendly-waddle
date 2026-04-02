import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RecentCasesProps {
  cases: Array<{
    id: string;
    procedureType: string;
    procedureDate: string;
    status: string;
  }>;
}

const statusStyles: Record<string, string> = {
  completed: 'bg-green-100 text-green-800',
  in_progress: 'bg-teal-100 text-teal-800',
  pending: 'bg-yellow-100 text-yellow-800',
  draft: 'bg-gray-100 text-gray-600',
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + '\u2026' : text;
}

export function RecentCases({ cases }: RecentCasesProps) {
  const recent = [...cases]
    .sort((a, b) => new Date(b.procedureDate).getTime() - new Date(a.procedureDate).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-500">Recent Cases</CardTitle>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <p className="text-sm text-gray-400">No cases recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {recent.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="min-w-0 flex-1 mr-3">
                  <Link
                    href={`/surgical-cases/${c.id}`}
                    className="text-sm font-medium text-teal-700 hover:text-teal-900 hover:underline"
                  >
                    {truncate(c.procedureType, 40)}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">{formatDate(c.procedureDate)}</p>
                </div>
                <Badge
                  variant="secondary"
                  className={statusStyles[c.status] || 'bg-gray-100 text-gray-600'}
                >
                  {c.status.replace(/_/g, ' ')}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
