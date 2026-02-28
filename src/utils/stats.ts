import type { Trip } from '@/types'

export interface TripStats {
  totalTrips: number
  totalCountries: number
  totalContinents: number
  avgRating: number
}

export function computeStats(trips: Trip[]): TripStats {
  const countries = new Set(trips.map((t) => t.destination.countryCode))
  const continents = new Set(trips.map((t) => t.destination.continent))
  const rated = trips.filter((t) => t.rating > 0)
  const avgRating = rated.length > 0
    ? rated.reduce((sum, t) => sum + t.rating, 0) / rated.length
    : 0
  return {
    totalTrips: trips.length,
    totalCountries: countries.size,
    totalContinents: continents.size,
    avgRating: Math.round(avgRating * 10) / 10,
  }
}
