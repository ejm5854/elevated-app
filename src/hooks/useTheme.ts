import { useAppStore, THEMES } from '@/store/useAppStore'
import type { ThemeTokens } from '@/types'

/** Returns the full token set for the currently active theme. */
export function useTheme(): ThemeTokens {
  const activeTheme = useAppStore((s) => s.activeTheme)
  return THEMES[activeTheme ?? 'erik']
}
