/** Format an ISO date string to a human-readable format, e.g. "March 2024" */
export function formatMonthYear(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

/** Format as "Mar 12 – Mar 18, 2024" */
export function formatTripDateRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  const sameYear = s.getFullYear() === e.getFullYear()
  const startStr = s.toLocaleDateString('en-US', opts)
  const endStr = e.toLocaleDateString('en-US', { ...opts, year: 'numeric' })
  if (sameYear) {
    return `${startStr} – ${endStr}`
  }
  return `${s.toLocaleDateString('en-US', { ...opts, year: 'numeric' })} – ${endStr}`
}

/** Number of nights between two ISO dates */
export function tripNights(start: string, end: string): number {
  const diff = new Date(end).getTime() - new Date(start).getTime()
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)))
}

/** "2 years ago", "3 months ago", etc. */
export function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'Today'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}
