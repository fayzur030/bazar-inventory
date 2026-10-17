'use client'

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function UserInfo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type='button'
            aria-label='Open user menu'
            className='rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          >
            <Avatar className='cursor-pointer'>
              <AvatarImage
                src='https://github.com/shadcn.png'
                alt='Admin profile'
              />
              <AvatarFallback>AR</AvatarFallback>
              <AvatarBadge className='bg-green-600 dark:bg-green-800' />
            </Avatar>
          </button>
        }
      />

      <DropdownMenuContent
        align='end'
        sideOffset={8}
        className='w-48 rounded-xl'
      >
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>

        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant='destructive'>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
