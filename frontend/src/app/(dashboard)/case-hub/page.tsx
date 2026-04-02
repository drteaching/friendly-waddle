'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  useCaseDiscussions,
  createCaseDiscussion,
  type CaseDiscussion,
} from '@/lib/hooks';

/** Fallback data shown when the API returns nothing. */
const mockDiscussions: CaseDiscussion[] = [
  {
    id: 'MDT-2025-018',
    title: 'Complex rectovaginal endometriosis — multidisciplinary input required',
    patientReference: 'PT-4412',
    status: 'open',
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01',
  },
  {
    id: 'MDT-2025-015',
    title: 'Recurrent disease post-excision — fertility considerations',
    patientReference: 'PT-4371',
    status: 'resolved',
    createdAt: '2025-11-22',
    updatedAt: '2025-11-22',
  },
  {
    id: 'MDT-2025-012',
    title: 'Adolescent presentation with chronic pelvic pain',
    patientReference: 'PT-4350',
    status: 'open',
    createdAt: '2025-11-15',
    updatedAt: '2025-11-15',
  },
];

const statusColours: Record<string, string> = {
  open: 'bg-green-100 text-green-800',
  resolved: 'bg-gray-100 text-gray-600',
};

export default function CaseHubPage() {
  const { data, loading, error, refetch } = useCaseDiscussions();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [patientReference, setPatientReference] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const discussions =
    data && data.length > 0 ? data : mockDiscussions;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await createCaseDiscussion({
        title: title.trim(),
        organisationId: '550e8400-e29b-41d4-a716-446655440000',
        createdBy: '550e8400-e29b-41d4-a716-446655440001',
        ...(patientReference.trim()
          ? { description: `Patient: ${patientReference.trim()}` }
          : {}),
      });
      setTitle('');
      setPatientReference('');
      setDialogOpen(false);
      refetch();
    } catch {
      // keep dialog open so the user can retry
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-gray-500">Loading discussions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-700">
          Failed to load discussions: {error}
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
          <h1 className="text-2xl font-bold text-gray-900">Case Hub</h1>
          <p className="mt-1 text-sm text-gray-500">
            Multidisciplinary team case discussions and collaborative care
            coordination.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>New Discussion</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Case Discussion</DialogTitle>
              <DialogDescription>
                Create a new MDT case discussion. Fill in the details below.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="disc-title">Title</Label>
                <Input
                  id="disc-title"
                  placeholder="Brief description of the case"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disc-patient">
                  Patient Reference{' '}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </Label>
                <Input
                  id="disc-patient"
                  placeholder="e.g. PT-1234"
                  value={patientReference}
                  onChange={(e) => setPatientReference(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting || !title.trim()}>
                  {submitting ? 'Creating...' : 'Create Discussion'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion) => (
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
                    {discussion.patientReference && (
                      <span>Patient: {discussion.patientReference}</span>
                    )}
                    <span>
                      Created:{' '}
                      {new Date(discussion.createdAt).toLocaleDateString()}
                    </span>
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
