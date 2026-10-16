'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  ChevronsUpDown,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShoppingBasket,
  User,
  X,
} from 'lucide-react'

import { DashboardHeader } from '@/components/header'
import { NAV_ITEMS } from '@/lib/nav-items'
import { cn } from '@/lib/utils'

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/'
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Brand({
  collapsed,
  onToggle,
}: {
  collapsed?: boolean
  onToggle?: () => void
}) {
  return (
    <div className='border-b border-[#E5E7EB] px-4 pt-5 pb-4 dark:border-gray-800'>
      <div
        className={cn(
          'flex',
          collapsed ? 'flex-col items-center gap-3' : 'items-center gap-2'
        )}
      >
        <Link
          href='/'
          aria-label='Bazar Inventory home'
          title={collapsed ? 'Bazar Inventory' : undefined}
          className={cn(
            'flex items-center gap-2.5',
            !collapsed && 'min-w-0 flex-1'
          )}
        >
          <span className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#15803D] text-white'>
            <ShoppingBasket className='size-5' aria-hidden='true' />
          </span>
          {!collapsed && (
            <span className='truncate text-base font-semibold tracking-tight text-[#1F2937] dark:text-gray-100'>
              Bazar Inventory
            </span>
          )}
        </Link>
        {onToggle && (
          <button
            type='button'
            onClick={onToggle}
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className='shrink-0 rounded-lg p-2 text-[#6B7280] hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
          >
            {collapsed ? (
              <PanelLeftOpen className='size-5' aria-hidden='true' />
            ) : (
              <PanelLeftClose className='size-5' aria-hidden='true' />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

function SidebarNav({
  onNavigate,
  collapsed,
}: {
  onNavigate?: () => void
  collapsed?: boolean
}) {
  const pathname = usePathname()

  return (
    <nav
      aria-label='Main navigation'
      className={cn('flex-1 overflow-y-auto py-4', collapsed ? 'px-2' : 'px-3')}
    >
      <ul className='space-y-1'>
        {NAV_ITEMS.map((item) => {
          const active = isActiveRoute(pathname, item.href)
          const Icon = item.icon
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                aria-label={collapsed ? item.title : undefined}
                title={collapsed ? item.title : undefined}
                onClick={onNavigate}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                  collapsed && 'justify-center px-2',
                  active
                    ? 'bg-[#DCFCE7] text-[#15803D] dark:bg-green-950 dark:text-green-300'
                    : 'text-[#1F2937] hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                )}
              >
                <Icon className='size-5 shrink-0' aria-hidden='true' />
                {!collapsed && <span className='truncate'>{item.title}</span>}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function UserProfile({
  onNavigate,
  collapsed,
}: {
  onNavigate?: () => void
  collapsed?: boolean
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) {
      return
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }
    const onPointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    onNavigate?.()
  }

  return (
    <div
      ref={menuRef}
      className={cn(
        'relative border-t border-[#E5E7EB] dark:border-gray-800',
        collapsed ? 'p-2' : 'p-3'
      )}
    >
      {menuOpen && (
        <div
          role='menu'
          aria-label='User menu'
          className={cn(
            'absolute rounded-lg border border-[#E5E7EB] bg-white py-1 dark:border-gray-700 dark:bg-gray-900',
            collapsed
              ? 'bottom-0 left-full ml-2 w-48'
              : 'inset-x-3 bottom-full mb-2'
          )}
        >
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
      <button
        type='button'
        onClick={() => setMenuOpen((value) => !value)}
        aria-haspopup='menu'
        aria-expanded={menuOpen}
        aria-label='User menu: Admin User, Administrator'
        title={collapsed ? 'Admin User (Administrator)' : undefined}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800',
          collapsed && 'justify-center px-0'
        )}
      >
        <span
          aria-hidden='true'
          className='flex size-9 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-sm font-semibold text-white'
        >
          AU
        </span>
        {!collapsed && (
          <>
            <span className='min-w-0 flex-1'>
              <span className='block truncate text-sm font-medium text-[#1F2937] dark:text-gray-100'>
                Admin User
              </span>
              <span className='block truncate text-xs text-[#6B7280] dark:text-gray-400'>
                Administrator
              </span>
            </span>
            <ChevronsUpDown
              className='size-4 shrink-0 text-[#6B7280] dark:text-gray-400'
              aria-hidden='true'
            />
          </>
        )}
      </button>
    </div>
  )
}

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (!mobileOpen) {
      return
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)
  const toggleCollapsed = () => setCollapsed((value) => !value)

  return (
    <div className='flex min-h-screen bg-white dark:bg-gray-950'>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-[#E5E7EB] bg-white transition-[width] duration-300 ease-in-out lg:flex dark:border-gray-800 dark:bg-gray-900',
          collapsed ? 'w-[72px]' : 'w-[260px]'
        )}
      >
        <Brand collapsed={collapsed} onToggle={toggleCollapsed} />
        <SidebarNav collapsed={collapsed} />
        <UserProfile collapsed={collapsed} />
      </aside>

      {/* Mobile / tablet drawer */}
      {mobileOpen && (
        <div className='fixed inset-0 z-50 lg:hidden'>
          <div
            className='absolute inset-0 bg-black/40'
            onClick={closeMobile}
            aria-hidden='true'
          />
          <aside
            role='dialog'
            aria-modal='true'
            aria-label='Navigation menu'
            className='absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-white dark:bg-gray-900'
          >
            <div className='flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3 dark:border-gray-800'>
              <span className='flex items-center gap-2 text-sm font-semibold text-[#1F2937] dark:text-gray-100'>
                <span className='flex size-8 items-center justify-center rounded-lg bg-[#15803D] text-white'>
                  <ShoppingBasket className='size-4' aria-hidden='true' />
                </span>
                Bazar Inventory
              </span>
              <button
                type='button'
                onClick={closeMobile}
                aria-label='Close menu'
                className='rounded-lg p-2 text-[#1F2937] hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
              >
                <X className='size-5' aria-hidden='true' />
              </button>
            </div>
            <SidebarNav onNavigate={closeMobile} />
            <UserProfile onNavigate={closeMobile} />
          </aside>
        </div>
      )}

      {/* Content column */}
      <div className='flex min-w-0 flex-1 flex-col'>
        <DashboardHeader onMenuClick={() => setMobileOpen(true)} />
        <main className='flex-1 p-4 md:p-6'>{children}</main>
      </div>
    </div>
  )
}
