import { useMemo } from 'react'
import { useAppStore } from '@/store/useAppStore'
import type { FilterState, Trip } from '@/types'

export function useFilteredTrips(filters: FilterState): Trip[] {
  const trips = useAppStore((s) => s.trips)

  return useMemo(() => {
    let result = [...trips]

    // Text search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.destination.city.toLowerCase().includes(q) ||
          t.destination.country.toLowerCase().includes(q) ||
          t.notes.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    // Tag filter
    if (filters.tags.length > 0) {
      result = result.filter((t) =>
        filters.tags.every((tag) => t.tags.includes(tag))
      )
    }

    // Sort
    result.sort((a, b) => {
      let aVal: string | number
      let bVal: string | number

      switch (filters.sortField) {
        case 'startDate': aVal = a.startDate; bVal = b.startDate; break
        case 'rating':    aVal = a.rating;    bVal = b.rating;    break
        case 'title':     aVal = a.title;     bVal = b.title;     break
        default:          aVal = a.createdAt; bVal = b.createdAt
      }

      if (aVal < bVal) return filters.sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return filters.sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [trips, filters])
}
