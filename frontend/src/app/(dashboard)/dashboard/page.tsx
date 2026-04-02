'use client';

import { useSurgicalCases, useCpdActivities, useAccreditationApplications } from '@/lib/hooks';
import { AccreditationBadge } from '@/components/dashboard/accreditation-badge';
import { ComplianceChart } from '@/components/dashboard/compliance-chart';
import { CpdProgress } from '@/components/dashboard/cpd-progress';
import { GentleNudges } from '@/components/dashboard/gentle-nudges';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentCases } from '@/components/dashboard/recent-cases';

export default function DashboardPage() {
  const { data: surgicalCases } = useSurgicalCases();
  const { data: cpdActivities } = useCpdActivities();
  const { data: applications } = useAccreditationApplications();

  // AccreditationBadge: use first application's targetTier if available
  const tier = applications && applications.length > 0
    ? applications[0].targetTier
    : 'EndoAdvanced';
  const expiresAt = applications && applications.length > 0 && applications[0].submittedAt
    ? applications[0].submittedAt
    : '2028-12-15';

  // ComplianceChart: calculate from application data, fall back to 78
  const compliancePercentage = applications && applications.length > 0 && applications[0].overallScore != null
    ? Math.round(applications[0].overallScore)
    : 78;

  // CpdProgress: sum hours from cpd activities, fall back to 42/60
  const earnedHours = cpdActivities && cpdActivities.length > 0
    ? cpdActivities.reduce((sum, a) => sum + a.hours, 0)
    : 42;
  const requiredHours = 60;

  // RecentCases: pass real data or empty array
  const cases = surgicalCases ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
        <AccreditationBadge tier={tier} expiresAt={expiresAt} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ComplianceChart percentage={compliancePercentage} />
        <CpdProgress earned={earnedHours} required={requiredHours} />
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentCases cases={cases} />
        <GentleNudges />
      </div>
    </div>
  );
}
