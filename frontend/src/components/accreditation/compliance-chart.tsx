'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ComplianceChartProps {
  /** Percentage of features that are fully met (0–100). */
  percentage: number;
  /** Optional label displayed below the chart. */
  label?: string;
}

const COLOURS = {
  met: '#0D9488',      // warm teal
  remaining: '#E5E7EB', // light grey
};

export function ComplianceChart({
  percentage,
  label = 'of applicable features met',
}: ComplianceChartProps) {
  const data = [
    { name: 'Met', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          Feature Compliance
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-centre">
        <div className="relative h-40 w-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={65}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell fill={COLOURS.met} />
                <Cell fill={COLOURS.remaining} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Centre label */}
          <div className="absolute inset-0 flex items-centre justify-centre">
            <span className="text-2xl font-bold text-gray-900">
              {percentage}%
            </span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
}
