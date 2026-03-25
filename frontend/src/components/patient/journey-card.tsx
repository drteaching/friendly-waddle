import { cn } from '@/lib/utils';
import { Calendar, FileText, Stethoscope, Pill, HeartPulse } from 'lucide-react';

export type JourneyEventType =
  | 'consultation'
  | 'surgery'
  | 'investigation'
  | 'medication'
  | 'milestone';

interface JourneyCardProps {
  /** Date of the event (ISO string). */
  date: string;
  /** Category of journey event. */
  type: JourneyEventType;
  /** Brief title for the event. */
  title: string;
  /** Optional longer description. */
  description?: string;
  /** Name of the provider or clinic. */
  provider?: string;
  /** Whether this is the most recent event (highlights the card). */
  isCurrent?: boolean;
}

const eventIcons: Record<JourneyEventType, React.ElementType> = {
  consultation: Stethoscope,
  surgery: HeartPulse,
  investigation: FileText,
  medication: Pill,
  milestone: Calendar,
};

const eventColours: Record<JourneyEventType, string> = {
  consultation: 'bg-teal-100 text-teal-700',
  surgery: 'bg-coral-100 text-coral-700',
  investigation: 'bg-blue-100 text-blue-700',
  medication: 'bg-purple-100 text-purple-700',
  milestone: 'bg-amber-100 text-amber-700',
};

/**
 * A single entry in the patient's Endo Passport journey timeline.
 * Displays the event type, date, provider, and a brief description.
 */
export function JourneyCard({
  date,
  type,
  title,
  description,
  provider,
  isCurrent = false,
}: JourneyCardProps) {
  const Icon = eventIcons[type];

  return (
    <div
      className={cn(
        'relative flex gap-4 rounded-lg border p-4 transition-shadow',
        isCurrent
          ? 'border-teal-300 bg-teal-50 shadow-sm'
          : 'border-gray-200 bg-white hover:shadow-sm',
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          eventColours[type],
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {title}
          </h4>
          <time className="shrink-0 text-xs text-gray-400">{date}</time>
        </div>
        {description && (
          <p className="mt-1 text-xs text-gray-600 line-clamp-2">
            {description}
          </p>
        )}
        {provider && (
          <p className="mt-1 text-xs text-gray-400">
            {provider}
          </p>
        )}
      </div>
    </div>
  );
}
