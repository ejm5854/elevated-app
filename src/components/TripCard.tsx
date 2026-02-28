import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { formatTripDateRange, tripNights } from '@/utils/dates'
import StarRating from './StarRating'
import TagBadge from './TagBadge'
import type { Trip } from '@/types'

interface TripCardProps {
  trip: Trip
}

export default function TripCard({ trip }: TripCardProps) {
  const theme = useTheme()
  const nights = tripNights(trip.startDate, trip.endDate)

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ backgroundColor: theme.cardBgHex, border: `1px solid ${theme.accentHex}20` }}
    >
      <Link to={`/memories/${trip.id}`} className="block">
        {/* Cover image */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <img
            src={trip.coverPhotoUrl}
            alt={trip.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Rating badge */}
          <div className="absolute top-3 right-3">
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: theme.accentHex }}
            >
              <span>{trip.rating}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill={theme.accentHex} stroke="none">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </div>
          </div>
          {/* Country flag emoji fallback */}
          <div className="absolute bottom-3 left-3">
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
            >
              {trip.destination.city}, {trip.destination.country}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 flex flex-col gap-2">
          <h3
            className="font-serif font-semibold text-base leading-snug line-clamp-2"
            style={{ color: theme.textHex }}
          >
            {trip.title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: theme.textMutedHex }}>
              {formatTripDateRange(trip.startDate, trip.endDate)}
            </span>
            <span className="text-xs" style={{ color: theme.textMutedHex }}>
              {nights}n
            </span>
          </div>

          <StarRating rating={trip.rating} size={13} />

          {trip.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {trip.tags.slice(0, 3).map((tag) => (
                <TagBadge key={tag} tag={tag} size="sm" />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
