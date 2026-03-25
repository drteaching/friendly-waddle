import { AccreditationBadge } from '@/components/dashboard/accreditation-badge';
import { ComplianceChart } from '@/components/dashboard/compliance-chart';
import { CpdProgress } from '@/components/dashboard/cpd-progress';
import { GentleNudges } from '@/components/dashboard/gentle-nudges';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentCases } from '@/components/dashboard/recent-cases';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
        <AccreditationBadge tier="EndoAdvanced" expiresAt="2028-12-15" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ComplianceChart percentage={78} />
        <CpdProgress earned={42} required={60} />
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentCases />
        <GentleNudges />
      </div>
    </div>
  );
}
