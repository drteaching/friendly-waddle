import { cn } from '@/lib/utils';
import { Award } from 'lucide-react';

export type AccreditationTier =
  | 'EndoAware'
  | 'EndoAdvanced'
  | 'EndoNetwork'
  | 'EndoCentre';

interface TierBadgeProps {
  tier: AccreditationTier;
  /** Optional expiry date string (ISO format). */
  expiresAt?: string;
  /** Render as a compact inline badge or a larger card-style badge. */
  size?: 'sm' | 'lg';
}

const tierStyles: Record<AccreditationTier, { bg: string; text: string; icon: string }> = {
  EndoAware: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: 'text-blue-500',
  },
  EndoAdvanced: {
    bg: 'bg-teal-100',
    text: 'text-teal-800',
    icon: 'text-teal-600',
  },
  EndoNetwork: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    icon: 'text-purple-500',
  },
  EndoCentre: {
    bg: 'bg-coral-100',
    text: 'text-coral-800',
    icon: 'text-coral-600',
  },
};

export function TierBadge({ tier, expiresAt, size = 'sm' }: TierBadgeProps) {
  const styles = tierStyles[tier];

  if (size === 'lg') {
    return (
      <div
        className={cn(
          'inline-flex items-centre gap-3 rounded-lg px-5 py-3',
          styles.bg,
        )}
      >
        <Award className={cn('h-6 w-6', styles.icon)} />
        <div>
          <p className={cn('text-sm font-semibold', styles.text)}>{tier}</p>
          {expiresAt && (
            <p className="text-xs text-gray-500">Expires {expiresAt}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-centre gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        styles.bg,
        styles.text,
      )}
    >
      <Award className={cn('h-3.5 w-3.5', styles.icon)} />
      {tier}
    </span>
  );
}
