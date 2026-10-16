'use client'
import logo from '/'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Headset,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Tags,
  Truck,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'

const overview = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Analytics', href: '/analytics', icon: BarChart3 },
  { title: 'Orders', href: '/orders', icon: ShoppingCart },
]

const management = [
  { title: 'Products', href: '/products', icon: Package },
  { title: 'Categories', href: '/categories', icon: Tags },
  { title: 'Suppliers', href: '/suppliers', icon: Truck },
  { title: 'Customers', href: '/customers', icon: Users },
]

const system = [
  { title: 'Settings', href: '/settings', icon: Settings },
  { title: 'Help Center', href: '/help', icon: Headset },
]

function NavItems({
  items,
}: {
  items: { title: string; href: string; icon: typeof Package }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              isActive={isActive}
              tooltip={item.title}
              render={<Link href={item.href} />}
              className={
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 font-medium text-white shadow-md shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-600 hover:text-white active:text-white data-active:bg-gradient-to-r'
                  : 'text-muted-foreground hover:text-foreground'
              }
            >
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant='inset' collapsible='icon' {...props}>
      {/* Brand */}
      <SidebarHeader className='px-3 pt-4 pb-2'>
        <Link
          href='/dashboard'
          className='flex items-center gap-3 rounded-xl px-1 outline-none focus-visible:ring-2 focus-visible:ring-ring'
        >
          <div className='flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-lg shadow-emerald-500/25'>
            <Store className='size-5' />
          </div>
          <div className='grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden'>
            <span className='truncate text-[15px] font-semibold tracking-tight'>
              Bazar Inventory
            </span>
            <span className='truncate text-[11px] font-medium tracking-widest text-muted-foreground uppercase'>
              Premium Dashboard
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className='gap-1 px-2'>
        <SidebarGroup className='px-1'>
          <SidebarGroupLabel className='px-2 text-[11px] font-semibold tracking-widest uppercase'>
            Overview
          </SidebarGroupLabel>
          <NavItems items={overview} />
        </SidebarGroup>

        <SidebarGroup className='px-1'>
          <SidebarGroupLabel className='px-2 text-[11px] font-semibold tracking-widest uppercase'>
            Management
          </SidebarGroupLabel>
          <NavItems items={management} />
        </SidebarGroup>

        <SidebarGroup className='mt-auto px-1'>
          <SidebarGroupLabel className='px-2 text-[11px] font-semibold tracking-widest uppercase'>
            System
          </SidebarGroupLabel>
          <NavItems items={system} />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='gap-2 p-3'>
        <SidebarSeparator className='mx-0' />

        <Button
          variant='ghost'
          className='w-full justify-start gap-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500'
          onClick={() => {
            console.log('Sign out clicked')
          }}
        >
          <LogOut className='size-4' />
          <span>Sign out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
