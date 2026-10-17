'use client'

import {
  BellOutlined,
  LogoutOutlined,
  MoonOutlined,
  SearchOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Grid,
  Input,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import type { ReactNode } from 'react'
import { useThemeMode } from './theme-provider'

export function AppHeader({
  onToggleSidebar,
  onOpenDrawer,
}: {
  onToggleSidebar: () => void
  onOpenDrawer: () => void
}): ReactNode {
  const { mode, toggle } = useThemeMode()
  const screens = Grid.useBreakpoint()
  const isDesktop = screens.lg ?? true

  const profileMenu = {
    items: [
      { key: 'profile', icon: <UserOutlined />, label: 'My profile' },
      { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
      { key: 'divider', type: 'divider' as const },
      { key: 'logout', icon: <LogoutOutlined />, label: 'Log out', danger: true },
    ],
  }

  return (
    <header className='app-header'>
      <div className='app-header-left'>
        <Tooltip title={isDesktop ? 'Toggle sidebar' : 'Open menu'} placement='bottom'>
          <Button
            type='text'
            className='app-header-trigger'
            aria-label='Toggle sidebar'
            onClick={isDesktop ? onToggleSidebar : onOpenDrawer}
          >
            <span className='app-burger' aria-hidden='true'>
              <i />
              <i />
              <i />
            </span>
          </Button>
        </Tooltip>

        <Input
          allowClear
          prefix={<SearchOutlined className='app-search-icon' />}
          placeholder='Search products, orders, customers…'
          aria-label='Search'
          className='app-search'
        />
      </div>

      <div className='app-header-right'>
        <Tooltip title='Notifications' placement='bottom'>
          <Badge count={3} size='small' offset={[-4, 6]}>
            <Button
              type='text'
              shape='circle'
              icon={<BellOutlined />}
              aria-label='Notifications'
              className='app-header-icon-btn'
            />
          </Badge>
        </Tooltip>

        <Tooltip title={mode === 'dark' ? 'Switch to light' : 'Switch to dark'} placement='bottom'>
          <Button
            type='text'
            shape='circle'
            aria-label='Toggle theme'
            onClick={toggle}
            className='app-theme-toggle'
            icon={mode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
          />
        </Tooltip>

        <Dropdown menu={profileMenu} placement='bottomRight' trigger={['click']}>
          <Space className='app-profile' size={10}>
            <Avatar
              size={36}
              style={{
                background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                boxShadow: '0 0 18px -4px rgba(37,99,235,0.9)',
              }}
            >
              AI
            </Avatar>
            <span className='app-profile-meta'>
              <Typography.Text strong>Admin User</Typography.Text>
              <Typography.Text type='secondary' className='app-profile-role'>
                Store manager
              </Typography.Text>
            </span>
          </Space>
        </Dropdown>
      </div>
    </header>
  )
}
