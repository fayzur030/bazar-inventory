'use client'

import * as React from 'react'
import {
  Bell,
  ChevronDown,
  LogOut,
  Moon,
  Search,
  Sun,
  User,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function SiteHeader() {
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const nextDark = !dark

    document.documentElement.classList.toggle('dark', nextDark)
    setDark(nextDark)
  }

  return (
    <header className='sticky top-0 z-30 flex w-full items-center border-b border-border/60 bg-background/80 backdrop-blur-xl'>
      <div className='flex h-16 w-full items-center gap-2 px-4 sm:gap-3 sm:px-6'>
        {/* Sidebar Toggle */}
        <SidebarTrigger className='shrink-0 rounded-lg text-muted-foreground hover:text-foreground' />

        <Separator orientation='vertical' className='h-5' />

        {/* Search */}
        <div className='relative w-full max-w-xs sm:max-w-sm'>
          <Search className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />

          <Input
            placeholder='Search products, orders...'
            className='h-9 rounded-xl border-border/60 bg-muted/60 pr-14 pl-9 text-[13px] shadow-none focus-visible:bg-background'
          />

          <kbd className='pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground sm:inline-flex'>
            Ctrl K
          </kbd>
        </div>

        {/* Right Actions */}
        <div className='ml-auto flex shrink-0 items-center gap-1 sm:gap-2'>
          {/* Notifications */}
          <Button
            variant='ghost'
            size='icon'
            aria-label='Notifications'
            className='relative rounded-xl text-muted-foreground hover:text-foreground'
          >
            <Bell className='size-[18px]' />

            <span className='absolute top-1.5 right-1.5 flex size-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60' />
              <span className='relative inline-flex size-2 rounded-full bg-rose-500 ring-2 ring-background' />
            </span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant='ghost'
            size='icon'
            aria-label='Toggle theme'
            onClick={toggleTheme}
            className='rounded-xl text-muted-foreground hover:text-foreground'
          >
            {dark ? (
              <Sun className='size-[18px]' />
            ) : (
              <Moon className='size-[18px]' />
            )}
          </Button>

          <Separator
            orientation='vertical'
            className='mx-1 hidden h-6 sm:block'
          />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type='button'
                  aria-label='Open profile menu'
                  className='flex items-center gap-2.5 rounded-xl py-1 pr-1 pl-1 transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring'
                >
                  <Avatar className='size-8'>
                    <AvatarFallback className='bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-semibold text-white'>
                      AR
                    </AvatarFallback>
                  </Avatar>

                  <span className='hidden text-left leading-tight md:grid'>
                    <span className='text-[13px] font-semibold'>
                      Ariful Rahman
                    </span>

                    <span className='text-xs text-muted-foreground'>
                      admin@bazar.com
                    </span>
                  </span>

                  <ChevronDown className='hidden size-4 text-muted-foreground md:block' />
                </button>
              }
            />

            <DropdownMenuContent align='end' sideOffset={8} className='w-56'>
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <div className='grid leading-tight'>
                    <span className='text-sm font-semibold'>Ariful Rahman</span>

                    <span className='text-xs font-normal text-muted-foreground'>
                      admin@bazar.com
                    </span>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className='mr-2 size-4' />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem variant='destructive'>
                  <LogOut className='mr-2 size-4' />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
