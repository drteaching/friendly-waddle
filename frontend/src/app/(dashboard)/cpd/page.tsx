'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useCpdActivities, createCpdActivity } from '@/lib/hooks';

const mockActivities = [
  {
    id: 'CPD-001',
    title: 'Advanced Laparoscopic Techniques Workshop',
    category: 'Educational Activity',
    hours: 8,
    activityDate: '2025-10-15',
    status: 'approved',
    ranzcogMapped: true,
  },
  {
    id: 'CPD-002',
    title: 'MDT Case Review — Complex Endometriosis',
    category: 'Practice Review',
    hours: 2,
    activityDate: '2025-11-01',
    status: 'approved',
    ranzcogMapped: true,
  },
  {
    id: 'CPD-003',
    title: '#Enzian Classification Training Module',
    category: 'Self-Directed Learning',
    hours: 4,
    activityDate: '2025-11-10',
    status: 'pending',
    ranzcogMapped: false,
  },
  {
    id: 'CPD-004',
    title: 'ASPIRE Network Annual Conference',
    category: 'Educational Activity',
    hours: 16,
    activityDate: '2025-09-20',
    status: 'approved',
    ranzcogMapped: true,
  },
  {
    id: 'CPD-005',
    title: 'Patient Outcomes Audit — PROMS Analysis',
    category: 'Measuring Outcomes',
    hours: 6,
    activityDate: '2025-08-12',
    status: 'approved',
    ranzcogMapped: true,
  },
  {
    id: 'CPD-006',
    title: 'Pelvic Pain Management Masterclass',
    category: 'Educational Activity',
    hours: 6,
    activityDate: '2025-07-05',
    status: 'approved',
    ranzcogMapped: true,
  },
];

const CATEGORIES = [
  'Educational Activity',
  'Practice Review',
  'Measuring Outcomes',
  'Self-Directed Learning',
] as const;

const REQUIRED_HOURS = 60;
const CYCLE_END = '2026-06-30';

export default function CpdPage() {
  const { data: apiActivities, loading, error, refetch } = useCpdActivities();

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    category: CATEGORIES[0] as string,
    hours: '',
    activityDate: '',
  });

  // Use API data when available, fall back to mock data
  const activities = apiActivities && apiActivities.length > 0 ? apiActivities : mockActivities;

  const earned = activities.reduce((sum, a) => sum + a.hours, 0);
  const percentage = Math.round((earned / REQUIRED_HOURS) * 100);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!form.title.trim() || !form.hours || !form.activityDate) {
      setFormError('All fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      await createCpdActivity({
        title: form.title.trim(),
        category: form.category,
        hours: Number(form.hours),
        activityDate: form.activityDate,
      });
      setModalOpen(false);
      setForm({ title: '', category: CATEGORIES[0], hours: '', activityDate: '' });
      refetch();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create activity');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent" />
      </div>
    );
  }

  if (error && (!apiActivities || apiActivities.length === 0)) {
    // Show error but still render page with mock data
  }

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
        <Button onClick={() => setModalOpen(true)}>Log Activity</Button>
      </div>

      {error && (
        <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
          Could not load activities from server. Showing sample data.
        </div>
      )}

      {/* Summary card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-500">Current Cycle Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {earned}{' '}
                <span className="text-base font-normal text-gray-400">
                  / {REQUIRED_HOURS} hours
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Cycle ends</p>
              <p className="text-sm font-medium">{CYCLE_END}</p>
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
                {activities.map((activity) => {
                  const ranzcogMapped = 'ranzcogMapped' in activity
                    ? (activity as { ranzcogMapped: boolean }).ranzcogMapped
                    : !!activity.ranzcogCategory;
                  return (
                    <tr key={activity.id} className="hover:bg-gray-50">
                      <td className="py-3 pr-4 font-medium text-gray-900">
                        {activity.title}
                      </td>
                      <td className="py-3 pr-4 text-gray-600">
                        {activity.category}
                      </td>
                      <td className="py-3 pr-4">{activity.hours}h</td>
                      <td className="py-3 pr-4">{activity.activityDate}</td>
                      <td className="py-3">
                        <Badge
                          variant="secondary"
                          className={
                            ranzcogMapped
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-500'
                          }
                        >
                          {ranzcogMapped ? 'Mapped' : 'Pending'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Log Activity Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <h2 className="text-lg font-semibold text-gray-900">Log CPD Activity</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
              {formError && (
                <div className="rounded-md bg-red-50 border border-red-200 p-2 text-sm text-red-700">
                  {formError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  placeholder="Activity title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={form.hours}
                  onChange={(e) => setForm({ ...form, hours: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  placeholder="e.g. 4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={form.activityDate}
                  onChange={(e) => setForm({ ...form, activityDate: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save Activity'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
