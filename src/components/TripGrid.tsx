import type { Trip } from '@/types'
import TripCard from './TripCard'

interface TripGridProps {
  trips: Trip[]
}

export default function TripGrid({ trips }: TripGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  )
}
