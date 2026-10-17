'use client'

import { Layout, Space, Typography } from 'antd'
import type { ReactNode } from 'react'

const { Footer } = Layout

export function AppFooter(): ReactNode {
  return (
    <Footer className='app-footer'>
      <Space size='middle' wrap>
        <Typography.Text className='app-footer-brand'>
          © 2026 Bazar Inventory
        </Typography.Text>
        <Typography.Link href='#' className='app-footer-link'>
          Docs
        </Typography.Link>
        <Typography.Link href='#' className='app-footer-link'>
          Support
        </Typography.Link>
        <Typography.Link href='#' className='app-footer-link'>
          API status
        </Typography.Link>
      </Space>
      <Space size='small' className='app-footer-status'>
        <span className='app-status-dot' aria-hidden='true' />
        <Typography.Text type='secondary'>All systems operational</Typography.Text>
        <Typography.Text type='secondary' className='app-footer-version'>
          v0.1.0
        </Typography.Text>
      </Space>
    </Footer>
  )
}
