'use client'

import {
  AppstoreOutlined,
  BarChartOutlined,
  DashboardOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  TagsOutlined,
  TeamOutlined,
} from '@ant-design/icons'

import {
  Avatar,
  Button,
  Layout,
  Menu,
  Tooltip,
  Typography,
  type MenuProps,
} from 'antd'

import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

const { Sider } = Layout

const NAV_ITEMS = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/products',
    icon: <ShopOutlined />,
    label: 'Products',
  },
  {
    key: '/categories',
    icon: <TagsOutlined />,
    label: 'Categories',
  },
  {
    key: '/orders',
    icon: <ShoppingCartOutlined />,
    label: 'Orders',
  },
  {
    key: '/customers',
    icon: <TeamOutlined />,
    label: 'Customers',
  },
  {
    key: '/analytics',
    icon: <BarChartOutlined />,
    label: 'Analytics',
  },
]

const FOOTER_ITEMS = [
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
  {
    key: '/help',
    icon: <QuestionCircleOutlined />,
    label: 'Help',
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Log out',
  },
]

export function SidebarLogo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className='app-sidebar-logo'>
      <span className='app-logo-mark'>
        <AppstoreOutlined />
      </span>

      {!collapsed && (
        <span className='app-logo-text'>
          Bazar <b>Inventory</b>
        </span>
      )}
    </div>
  )
}

/* Sidebar content shared by desktop and mobile Drawer */
export function SidebarContent({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean
  onNavigate?: () => void
}) {
  const router = useRouter()
  const pathname = usePathname()

  const selected = NAV_ITEMS.find(
    (item) => pathname === item.key || pathname.startsWith(`${item.key}/`)
  )?.key

  const selectedFooter = FOOTER_ITEMS.find(
    (item) =>
      item.key !== 'logout' &&
      (pathname === item.key || pathname.startsWith(`${item.key}/`))
  )?.key

  const handleSelect: MenuProps['onClick'] = ({ key }) => {
    onNavigate?.()

    if (key.startsWith('/')) {
      router.push(key)
    }

    if (key === 'logout') {
      // Add your logout functionality here.
    }
  }

  return (
    <div className='flex h-full min-h-0 flex-col'>
      <SidebarLogo collapsed={collapsed} />

      <div className='min-h-0 flex-1 overflow-y-auto overflow-x-hidden'>
        <Menu
          theme='dark'
          mode='inline'
          inlineCollapsed={collapsed}
          selectedKeys={selected ? [selected] : []}
          items={NAV_ITEMS}
          onClick={handleSelect}
          className='app-nav'
        />
      </div>

      <div className='app-nav-footer shrink-0'>
        <Menu
          theme='dark'
          mode='inline'
          inlineCollapsed={collapsed}
          selectedKeys={selectedFooter ? [selectedFooter] : []}
          items={FOOTER_ITEMS}
          onClick={handleSelect}
          className='app-nav'
        />
      </div>
    </div>
  )
}

/* Desktop Sidebar */
export function AppSidebar({
  collapsed,
  onCollapse,
}: {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}): ReactNode {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={248}
      collapsedWidth={76}
      breakpoint='lg'
      className='app-sidebar hidden lg:block'
    >
      {!collapsed && <span className='app-glow-rail app-glow-rail-navy' />}

      <SidebarContent collapsed={collapsed} />

      <Tooltip title={collapsed ? 'Expand' : 'Collapse'} placement='right'>
        <Button
          type='text'
          className='app-sidebar-trigger'
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => onCollapse(!collapsed)}
        >
          {collapsed ? <MenuUnfold /> : <MenuFold />}
        </Button>
      </Tooltip>
    </Sider>
  )
}

function MenuFold() {
  return <span className='app-trigger-icon'>»</span>
}

function MenuUnfold() {
  return <span className='app-trigger-icon'>«</span>
}

export function SidebarHeading({ collapsed }: { collapsed: boolean }) {
  if (collapsed) return null

  return <Typography.Text className='app-nav-heading'>MENU</Typography.Text>
}
