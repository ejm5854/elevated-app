import { useTheme } from '@/hooks/useTheme'
import type { ViewMode } from '@/types'

interface ViewToggleProps {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}

export default function ViewToggle({ mode, onChange }: ViewToggleProps) {
  const theme = useTheme()

  return (
    <div
      className="flex items-center rounded-lg p-0.5 gap-0.5"
      style={{ backgroundColor: `${theme.accentHex}15`, border: `1px solid ${theme.accentHex}25` }}
    >
      {(['grid', 'list'] as ViewMode[]).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className="p-1.5 rounded-md transition-all duration-200"
          style={{
            backgroundColor: mode === m ? theme.accentHex : 'transparent',
            color: mode === m ? theme.bgHex : theme.textMutedHex,
          }}
          title={m === 'grid' ? 'Grid view' : 'List view'}
        >
          {m === 'grid' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}
