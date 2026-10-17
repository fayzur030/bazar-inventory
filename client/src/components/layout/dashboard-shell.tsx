'use client'

import { Button, Drawer, Layout } from 'antd'
import { useState, type ReactNode } from 'react'
import { AppFooter } from './app-footer'
import { AppHeader } from './app-header'
import { AppSidebar, SidebarContent } from './app-sidebar'

const { Content } = Layout

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  return (
    <Layout className='app-shell min-h-screen'>
      {/* Desktop Sidebar */}
      <div className='hidden md:block'>
        <AppSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      </div>

      {/* Main Layout */}
      <Layout className='app-main min-w-0'>
        <AppHeader
          onToggleSidebar={() => setCollapsed((value) => !value)}
          onOpenDrawer={() => setDrawerOpen(true)}
        />

        <Content className='app-content min-w-0 p-3 sm:p-4 lg:p-6'>
          {children}
        </Content>

        <AppFooter />
      </Layout>

      {/* Mobile & Tablet Drawer */}
      <Drawer
        placement='left'
        open={drawerOpen}
        onClose={closeDrawer}
        size='default'
        className='app-drawer'
        styles={{
          wrapper: {
            width: 'min(264px, 85vw)',
          },
          body: {
            padding: 0,
            background: 'transparent',
          },
        }}
        closeIcon={false}
      >
        <div className='app-drawer-bar flex items-center justify-end p-3'>
          <Button
            type='text'
            aria-label='Close menu'
            onClick={closeDrawer}
            className='app-drawer-close'
          >
            ×
          </Button>
        </div>

        <SidebarContent collapsed={false} onNavigate={closeDrawer} />
      </Drawer>
    </Layout>
  )
}
