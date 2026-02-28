import { useAppStore } from '@/store/useAppStore'
import { useTheme } from '@/hooks/useTheme'
import { computeStats } from '@/utils/stats'

export default function StatsBar() {
  const trips = useAppStore((s) => s.trips)
  const theme = useTheme()
  const stats = computeStats(trips)

  const items = [
    { label: 'Trips', value: stats.totalTrips },
    { label: 'Countries', value: stats.totalCountries },
    { label: 'Continents', value: stats.totalContinents },
    { label: 'Avg Rating', value: stats.avgRating > 0 ? `${stats.avgRating}★` : '—' },
  ]

  return (
    <div
      className="flex items-center gap-6 px-4 py-2 rounded-xl text-sm"
      style={{ backgroundColor: `${theme.accentHex}10`, border: `1px solid ${theme.accentHex}20` }}
    >
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="font-semibold text-base" style={{ color: theme.accentHex }}>
            {item.value}
          </span>
          <span className="text-xs" style={{ color: theme.textMutedHex }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
