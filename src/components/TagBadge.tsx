import { useTheme } from '@/hooks/useTheme'

interface TagBadgeProps {
  tag: string
  onClick?: () => void
  active?: boolean
  size?: 'sm' | 'md'
}

export default function TagBadge({ tag, onClick, active = false, size = 'sm' }: TagBadgeProps) {
  const theme = useTheme()

  const base = size === 'sm'
    ? 'px-2 py-0.5 text-xs rounded-full font-medium tracking-wide'
    : 'px-3 py-1 text-sm rounded-full font-medium tracking-wide'

  const style = active
    ? { backgroundColor: theme.accentHex, color: theme.bgHex, cursor: onClick ? 'pointer' : 'default' }
    : { backgroundColor: `${theme.accentHex}18`, color: theme.accentHex, border: `1px solid ${theme.accentHex}30`, cursor: onClick ? 'pointer' : 'default' }

  return (
    <span className={base} style={style} onClick={onClick}>
      {tag}
    </span>
  )
}
