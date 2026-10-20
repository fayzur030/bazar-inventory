'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { Search, Sun, Moon, LogOut, ChevronRight } from 'lucide-react'

import { useTheme } from 'next-themes'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { dashboards, modules, type NavItem } from './nav-data'
import { UserInfo } from './UserInfo'
import Link from 'next/link'

const AVATAR = 'https://i.pravatar.cc/80?img=12'

function NavGroup({
  label,
  items,
  chevron,
}: {
  label: string
  items: NavItem[]
  chevron?: boolean
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-[11px] uppercase tracking-widest'>
        {label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              item.slug === '/'
                ? pathname === '/dashboard'
                : pathname === `/dashboard/${item.slug}`

            return (
              <SidebarMenuItem key={item.title}>
                <Link href={`/dashboard/${item.slug}`}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.title}
                    className={`h-10 rounded-xl px-3 transition-all duration-300 ${
                      isActive
                        ? 'bg-linear-to-r from-[#2563eb] to-[#4f46e5] text-white! shadow-[0_0_16px_oklch(0.532_0.23_277/0.4)] data-[active=true]:bg-linear-to-r data-[active=true]:text-white'
                        : 'text-slate-600 hover:bg-[#2563eb]/10 hover:text-[#2563eb] dark:text-slate-300 dark:hover:bg-[#4f46e5]/15 dark:hover:text-indigo-300'
                    }`}
                  >
                    <item.icon />
                    <span>{item.title}</span>

                    {chevron && <ChevronRight className='ml-auto opacity-60' />}
                  </SidebarMenuButton>
                </Link>

                {item.badge && (
                  <SidebarMenuBadge className='rounded-md bg-primary/15 text-[10px] text-primary'>
                    {item.badge}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppLayout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme()

  return (
    <SidebarProvider>
      <Sidebar collapsible='icon'>
        <SidebarHeader className='gap-4 p-4'>
          <div className='flex items-center gap-2 text-xl font-extrabold tracking-tight'>
            <div className='size-7 shrink-0 rounded-lg bg-brand-gradient logo-glow' />

            <span className='group-data-[collapsible=icon]:hidden'>VIREO</span>
          </div>

          <div className='group-data-[collapsible=icon]:hidden'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

              <Input
                placeholder='Filter menu...'
                className='rounded-xl bg-background/50 pl-9'
              />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <NavGroup label='Dashboards' items={dashboards} />

          

          <NavGroup label='Modules' items={modules} chevron />
        </SidebarContent>

        <SidebarFooter className='border-t border-sidebar-border p-3'>
          <div className='flex items-center gap-3'>
            <Avatar>
              <AvatarImage src={AVATAR} alt='Jacob Gerrald' />
              <AvatarFallback>JG</AvatarFallback>
            </Avatar>

            <div className='min-w-0 flex-1 group-data-[collapsible=icon]:hidden'>
              <p className='text-sm font-semibold'>Jacob Gerrald</p>

              <p className='text-xs text-muted-foreground'>jacob@vireo.io</p>
            </div>

            <button
              type='button'
              aria-label='Log out'
              className='group-data-[collapsible=icon]:hidden'
            >
              <LogOut className='size-4 text-muted-foreground' />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className='sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur'>
          <SidebarTrigger />

          <div className='relative hidden w-64 md:block'>
            <Search className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

            <Input
              placeholder='Search or jump to...'
              className='rounded-xl bg-card pl-9 pr-12'
            />

            <kbd className='absolute right-2 top-1/2 -translate-y-1/2 rounded bg-muted px-1.5 text-[10px] text-muted-foreground'>
              Ctrl K
            </kbd>
          </div>

          <div className='ml-auto flex items-center gap-4'>
            <Button
              variant='outline'
              size='icon'
              aria-label='Toggle theme'
              suppressHydrationWarning
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='group relative size-10 overflow-hidden rounded-xl border-[#E2E8F0] bg-white text-[#4F46E5] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6366F1] hover:bg-[#EEF2FF] hover:shadow-[0_0_16px_rgba(99,102,241,0.18)]  dark:border-[#263247] dark:bg-[#111827] dark:text-[#A5B4FC] dark:hover:border-[#6366F1] dark:hover:bg-[#1F2937] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]'
            >
              {theme === 'light' ? (
                <Moon
                  size={19}
                  strokeWidth={1.8}
                  className='transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110'
                />
              ) : (
                <Sun
                  size={19}
                  strokeWidth={1.8}
                  className='transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110'
                />
              )}
            </Button>

            <UserInfo />
          </div>
        </header>

        <main className='flex-1 p-4 md:p-6'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
