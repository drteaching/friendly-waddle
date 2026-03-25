import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { TierBadge } from '@/components/accreditation/tier-badge';
import type { AccreditationTier } from '@/components/accreditation/tier-badge';

/** Placeholder network data — will be fetched from the API. */
const mockProviders = [
  {
    name: 'Dr A. Nguyen',
    clinic: 'Royal Women\'s Hospital',
    location: 'Melbourne, VIC',
    tier: 'EndoAdvanced' as AccreditationTier,
    specialities: ['Laparoscopic Surgery', 'Deep Infiltrating Endometriosis'],
  },
  {
    name: 'Dr J. Chen',
    clinic: 'Westmead Endometriosis Centre',
    location: 'Sydney, NSW',
    tier: 'EndoCentre' as AccreditationTier,
    specialities: ['Robotic Surgery', 'Fertility Preservation'],
  },
  {
    name: 'Dr S. Williams',
    clinic: 'Adelaide Women\'s Health',
    location: 'Adelaide, SA',
    tier: 'EndoAware' as AccreditationTier,
    specialities: ['General Gynaecology', 'Pain Management'],
  },
  {
    name: 'Prof. M. O\'Brien',
    clinic: 'Queensland Endometriosis Clinic',
    location: 'Brisbane, QLD',
    tier: 'EndoNetwork' as AccreditationTier,
    specialities: ['Research', 'MDT Coordination', 'Training'],
  },
];

export default function NetworkPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Network Map</h1>
        <p className="mt-1 text-sm text-gray-500">
          Explore accredited providers, clinics, and hospitals across the ASPIRE
          network.
        </p>
      </div>

      {/* Search */}
      <div className="flex items-centre gap-4">
        <Input
          placeholder="Search by name, clinic, or location..."
          className="max-w-md"
        />
      </div>

      {/* Map placeholder */}
      <Card>
        <CardContent className="flex items-centre justify-centre p-12">
          <div className="text-centre text-gray-400">
            <div className="mx-auto mb-3 flex h-16 w-16 items-centre justify-centre rounded-full bg-gray-100">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium">Interactive Map</p>
            <p className="text-xs">
              Map visualisation will be rendered here when the mapping library is
              integrated.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Provider directory */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Accredited Providers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProviders.map((provider) => (
              <div
                key={provider.name}
                className="flex items-start justify-between gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colours"
              >
                <div className="flex-1">
                  <div className="flex items-centre gap-2 mb-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {provider.name}
                    </h3>
                    <TierBadge tier={provider.tier} />
                  </div>
                  <p className="text-sm text-gray-600">{provider.clinic}</p>
                  <p className="text-xs text-gray-400">{provider.location}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {provider.specialities.map((s) => (
                      <Badge key={s} variant="outline" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
