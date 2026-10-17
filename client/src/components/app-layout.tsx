'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import {
  Search,
  Sun,
  SlidersHorizontal,
  LogOut,
  ChevronRight,
} from 'lucide-react'

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

import { dashboards, applications, modules, type NavItem } from './nav-data'
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
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.title}
                  className={`h-10 rounded-xl px-3 transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm data-[active=true]:bg-emerald-600 data-[active=true]:text-white'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-300'
                  }`}
                >
                  <Link
                    href={`/dashboard/${item.slug}`}
                    className='flex items-center gap-4'
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>

                  {chevron && <ChevronRight className='ml-auto opacity-60' />}
                </SidebarMenuButton>

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
  return (
    <SidebarProvider>
      <Sidebar collapsible='icon'>
        <SidebarHeader className='gap-4 p-4'>
          <div className='flex items-center gap-2 text-xl font-extrabold tracking-tight'>
            <div className='size-7 shrink-0 rounded-lg bg-gradient-teal' />

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

          <NavGroup label='Applications' items={applications} chevron />

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
              className='group relative size-10 overflow-hidden rounded-xl border-border/70 bg-gradient-to-br from-amber-50 to-orange-100 text-amber-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md dark:from-slate-800 dark:to-slate-900 dark:text-amber-300'
            >
              <Sun
                size={19}
                strokeWidth={1.8}
                className='transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110'
              />
            </Button>

            <UserInfo />
          </div>
        </header>

        <main className='flex-1 p-4 md:p-6'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
