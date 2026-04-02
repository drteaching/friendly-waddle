import { Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GentleNudgeProps {
  /** The feature number this nudge relates to. */
  featureId: number;
  /** Friendly, encouraging message for the provider. */
  message: string;
  /** Where the call-to-action should navigate. */
  actionHref?: string;
  /** Label for the call-to-action link. */
  actionLabel?: string;
}

/**
 * A "gentle nudge" card that encourages providers to improve compliance
 * without being prescriptive. Uses warm, supportive language in keeping
 * with the ASPIRE tone.
 */
export function GentleNudge({
  featureId,
  message,
  actionHref,
  actionLabel = 'Learn more',
}: GentleNudgeProps) {
  return (
    <div className="rounded-lg border border-coral-200 bg-coral-50 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full bg-coral-100 p-1.5">
          <Lightbulb className="h-4 w-4 text-coral-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-coral-900">
            Feature {featureId} — Suggestion
          </p>
          <p className="mt-1 text-sm text-coral-700">{message}</p>
          {actionHref && (
            <Link
              href={actionHref}
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-coral-600 hover:text-coral-800 transition-colors"
            >
              {actionLabel}
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
