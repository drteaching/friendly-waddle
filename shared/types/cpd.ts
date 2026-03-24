// Continuing Professional Development types
// Tracks CPD activities, micro-credits, and quarterly growth reports with peer benchmarking

export type CpdActivityType = 'surgical_reflection' | 'mdt_meeting' | 'case_hub_review' | 'cme_attendance' | 'cme_organisation' | 'research_contribution' | 'endocare_self_assessment' | 'video_review' | 'mentorship';
export type CpdSource = 'surgical_performance' | 'case_hub' | 'ai_audit' | 'manual_entry';

export interface CpdRecord {
  practitionerId: string;
  currentCycle: {
    startDate: Date;
    endDate: Date;
    totalHoursRequired: number;
    totalHoursEarned: number;
  };
  activities: CpdActivity[];
  quarterlyReports: QuarterlyGrowthReport[];
}

export interface CpdActivity {
  id: string;
  type: CpdActivityType;
  description: string;
  hours: number;
  microCredits: number;
  source: CpdSource;
  evidenceUrl?: string;
  date: Date;
  ranzCogMapped: boolean;
  ranzCogCategory?: string;
}

export interface QuarterlyGrowthReport {
  quarter: string;
  featureCompliancePercent: number;
  cpdProgressPercent: number;
  patientSatisfactionTrend?: number;
  gentlePrompts: string[];
  peerBenchmark: {
    anonymisedPercentile: number;
    areaOfStrength: string;
    areaForGrowth: string;
  };
}
