'use client'

import { ConfigProvider, theme as antdTheme, type ThemeConfig } from 'antd'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  useMemo,
  type ReactNode,
} from 'react'

export type ThemeMode = 'dark' | 'light'

type ThemeContextValue = {
  mode: ThemeMode
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'dark',
  toggle: () => {},
})

export const useThemeMode = () => useContext(ThemeContext)

const STORAGE_KEY = 'bazar-theme-mode'
const DARK: ThemeMode = 'dark'

/**
 * Persisted theme store. `useSyncExternalStore` keeps the first client render
 * identical to the server render (dark), so no hydration mismatch, and it
 * avoids setState-in-effect, which eslint react-hooks rejects.
 */
const listeners = new Set<() => void>()

function emitChange() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function readMode(): ThemeMode {
  return window.localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
}

function getServerSnapshot(): ThemeMode {
  return DARK
}

function writeMode(mode: ThemeMode) {
  window.localStorage.setItem(STORAGE_KEY, mode)
  emitChange()
}

/**
 * Dark-first Ant Design theme. Glow palette used across the shell:
 * #102b5a deep navy, #2563eb blue, #4f46e5 indigo.
 *
 * The mode also drives the Tailwind `dark` class and data-theme on <html>, so
 * antd tokens and the shadcn/tailwind pages flip together.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(subscribe, readMode, getServerSnapshot)

  const toggle = useCallback(() => {
    writeMode(readMode() === 'dark' ? 'light' : 'dark')
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [mode])

  const config = useMemo<ThemeConfig>(() => {
    const dark = mode === 'dark'
    return {
      algorithm: dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: '#2563eb',
        colorInfo: '#2563eb',
        colorLink: '#60a5fa',
        colorSuccess: '#22c55e',
        colorWarning: '#f59e0b',
        colorError: '#ef4444',
        borderRadius: 12,
        fontFamily: 'var(--font-jakarta), var(--font-geist-mono), system-ui, sans-serif)',
        colorBgContainer: dark ? '#0a1730' : '#ffffff',
        colorBgElevated: dark ? '#0b1731' : '#ffffff',
      },
      components: {
        Layout: {
          headerBg: 'transparent',
          bodyBg: 'transparent',
          footerBg: 'transparent',
          siderBg: 'transparent',
        },
        Input: {
          activeShadow: dark
            ? '0 0 0 3px rgba(79,70,229,0.32)'
            : '0 0 0 3px rgba(37,99,235,0.15)',
          hoverBorderColor: '#2563eb',
        },
        Button: { primaryShadow: '0 12px 32px -16px rgba(37,99,235,0.9)' },
      },
    }
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <ConfigProvider theme={config}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  )
}
