import { Link } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { formatTripDateRange, tripNights } from '@/utils/dates'
import StarRating from './StarRating'
import TagBadge from './TagBadge'
import type { Trip } from '@/types'

interface TripListItemProps {
  trip: Trip
}

export default function TripListItem({ trip }: TripListItemProps) {
  const theme = useTheme()
  const nights = tripNights(trip.startDate, trip.endDate)

  return (
    <Link
      to={`/memories/${trip.id}`}
      className="flex items-center gap-4 p-3 rounded-xl transition-all duration-200 hover:scale-[1.005]"
      style={{ backgroundColor: theme.cardBgHex, border: `1px solid ${theme.accentHex}20` }}
    >
      {/* Thumbnail */}
      <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={trip.coverPhotoUrl}
          alt={trip.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-serif font-semibold text-sm leading-snug truncate"
            style={{ color: theme.textHex }}
          >
            {trip.title}
          </h3>
          <StarRating rating={trip.rating} size={12} />
        </div>
        <p className="text-xs mt-0.5" style={{ color: theme.textMutedHex }}>
          {trip.destination.city}, {trip.destination.country} &middot; {formatTripDateRange(trip.startDate, trip.endDate)} &middot; {nights}n
        </p>
        {trip.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {trip.tags.slice(0, 4).map((tag) => (
              <TagBadge key={tag} tag={tag} size="sm" />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
