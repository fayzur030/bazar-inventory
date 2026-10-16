'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  ShoppingBasket,
  Sun,
  User,
  X,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const THEME_STORAGE_KEY = 'bazar-theme'

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const isDark = stored ? stored === 'dark' : prefersDark
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    setMounted(true)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    window.localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
    document.documentElement.style.colorScheme = next ? 'dark' : 'light'
  }

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label={
        mounted && dark ? 'Switch to light mode' : 'Switch to dark mode'
      }
      title={mounted && dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className='rounded-lg p-2 text-[#1F2937] hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
    >
      {mounted && dark ? (
        <Sun className='size-5' aria-hidden='true' />
      ) : (
        <Moon className='size-5' aria-hidden='true' />
      )}
    </button>
  )
}

function SearchForm({
  id,
  autoFocus,
  onSubmitted,
  className,
}: {
  id: string
  autoFocus?: boolean
  onSubmitted?: () => void
  className?: string
}) {
  const router = useRouter()
  const [value, setValue] = useState('')

  return (
    <form
      role='search'
      aria-label='Product search'
      className={cn('relative', className)}
      onSubmit={(event) => {
        event.preventDefault()
        const query = value.trim()
        router.push(
          query ? `/products?q=${encodeURIComponent(query)}` : '/products'
        )
        onSubmitted?.()
      }}
    >
      <Search
        aria-hidden='true'
        className='pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[#6B7280] dark:text-gray-400'
      />
      <input
        id={id}
        type='search'
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => setValue(event.target.value)}
        placeholder='Search products...'
        aria-label='Search products'
        className='h-9 w-full rounded-lg border border-[#E5E7EB] bg-gray-50 pr-8 pl-9 text-sm text-[#1F2937] placeholder:text-[#6B7280] focus:border-[#15803D] focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400'
      />
      {value && (
        <button
          type='button'
          onClick={() => setValue('')}
          aria-label='Clear search'
          className='absolute top-1/2 right-1.5 -translate-y-1/2 rounded-md p-1 text-[#6B7280] hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'
        >
          <X className='size-4' aria-hidden='true' />
        </button>
      )}
    </form>
  )
}

function HeaderAccount() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    const onPointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <div ref={menuRef} className='relative'>
      <button
        type='button'
        onClick={() => setOpen((value) => !value)}
        aria-haspopup='menu'
        aria-expanded={open}
        aria-label='Account menu: Admin User, Administrator'
        className='flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800'
      >
        <span
          aria-hidden='true'
          className='flex size-8 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-xs font-semibold text-white'
        >
          AU
        </span>
        <span className='hidden min-w-0 text-left xl:block'>
          <span className='block truncate text-sm font-medium text-[#1F2937] dark:text-gray-100'>
            Admin User
          </span>
          <span className='block truncate text-xs text-[#6B7280] dark:text-gray-400'>
            Administrator
          </span>
        </span>
      </button>
      {open && (
        <div
          role='menu'
          aria-label='Account menu'
          className='absolute top-full right-0 z-50 mt-2 w-52 rounded-lg border border-[#E5E7EB] bg-white py-1 dark:border-gray-700 dark:bg-gray-900'
        >
          <div className='border-b border-[#E5E7EB] px-3 py-2 dark:border-gray-700'>
            <p className='truncate text-sm font-medium text-[#1F2937] dark:text-gray-100'>
              Admin User
            </p>
            <p className='truncate text-xs text-[#6B7280] dark:text-gray-400'>
              admin@bazar.com
            </p>
          </div>
          <Link
            role='menuitem'
            href='/settings'
            onClick={closeMenu}
            className='flex items-center gap-2 px-3 py-2 text-sm text-[#1F2937] hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
          >
            <User className='size-4' aria-hidden='true' />
            Profile
          </Link>
          <Link
            role='menuitem'
            href='/settings'
            onClick={closeMenu}
            className='flex items-center gap-2 px-3 py-2 text-sm text-[#1F2937] hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
          >
            <Settings className='size-4' aria-hidden='true' />
            Account Settings
          </Link>
          <button
            role='menuitem'
            type='button'
            onClick={closeMenu}
            className='flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[#1F2937] hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
          >
            <LogOut className='size-4' aria-hidden='true' />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const [mobileSearch, setMobileSearch] = useState(false)

  return (
    <header className='sticky top-0 z-30 border-b border-[#E5E7EB] bg-white dark:border-gray-800 dark:bg-gray-900'>
      <div className='flex h-14 items-center gap-2 px-4'>
        <button
          type='button'
          onClick={onMenuClick}
          aria-label='Open menu'
          className='rounded-lg p-2 text-[#1F2937] hover:bg-gray-100 lg:hidden dark:text-gray-200 dark:hover:bg-gray-800'
        >
          <Menu className='size-5' aria-hidden='true' />
        </button>
        <span className='flex items-center gap-2 text-sm font-semibold text-[#1F2937] lg:hidden dark:text-gray-100'>
          <span className='flex size-7 items-center justify-center rounded-md bg-[#15803D] text-white'>
            <ShoppingBasket className='size-4' aria-hidden='true' />
          </span>
          Bazar Inventory
        </span>
        <div className='hidden min-w-0 flex-1  md:flex'>
          <SearchForm id='site-search' className='w-full max-w-md' />
        </div>
        <div className='ml-auto flex shrink-0 items-center gap-1'>
          <button
            type='button'
            onClick={() => setMobileSearch((value) => !value)}
            aria-expanded={mobileSearch}
            aria-label='Toggle product search'
            className='rounded-lg p-2 text-[#1F2937] hover:bg-gray-100 md:hidden dark:text-gray-200 dark:hover:bg-gray-800'
          >
            <Search className='size-5' aria-hidden='true' />
          </button>
          <ThemeToggle />
          <span
            aria-hidden='true'
            className='mx-1 hidden h-6 w-px bg-[#E5E7EB] sm:block dark:bg-gray-700'
          />
          <HeaderAccount />
        </div>
      </div>
      {mobileSearch && (
        <div className='border-t border-[#E5E7EB] px-4 py-2 md:hidden dark:border-gray-800'>
          <SearchForm
            id='site-search-mobile'
            autoFocus
            onSubmitted={() => setMobileSearch(false)}
          />
        </div>
      )}
    </header>
  )
}
