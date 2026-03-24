'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export type ComplianceStatus =
  | 'fully_met'
  | 'partially_met'
  | 'not_met'
  | 'not_applicable';

interface FeatureAssessmentCardProps {
  featureId: number;
  title: string;
  description: string;
  tier: 'mandatory' | 'desirable' | 'aspirational';
  status?: ComplianceStatus;
  notes?: string;
  onStatusChange?: (featureId: number, status: ComplianceStatus) => void;
  onNotesChange?: (featureId: number, notes: string) => void;
}

const tierColours: Record<string, string> = {
  mandatory: 'bg-red-100 text-red-800',
  desirable: 'bg-amber-100 text-amber-800',
  aspirational: 'bg-blue-100 text-blue-800',
};

const statusLabels: Record<ComplianceStatus, string> = {
  fully_met: 'Fully Met',
  partially_met: 'Partially Met',
  not_met: 'Not Met',
  not_applicable: 'Not Applicable',
};

export function FeatureAssessmentCard({
  featureId,
  title,
  description,
  tier,
  status,
  notes,
  onStatusChange,
  onNotesChange,
}: FeatureAssessmentCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-centre gap-2 mb-1">
              <span className="text-sm font-semibold text-gray-700">
                Feature {featureId}
              </span>
              <Badge
                variant="secondary"
                className={tierColours[tier] ?? ''}
              >
                {tier}
              </Badge>
            </div>
            <h4 className="text-sm font-medium text-gray-900">{title}</h4>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>

          <Select
            value={status}
            onValueChange={(value) =>
              onStatusChange?.(featureId, value as ComplianceStatus)
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Assess..." />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(statusLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Evidence notes */}
        <Textarea
          placeholder="Supporting evidence or notes..."
          value={notes ?? ''}
          onChange={(e) => onNotesChange?.(featureId, e.target.value)}
          className="text-xs"
          rows={2}
        />
      </CardContent>
    </Card>
  );
}
