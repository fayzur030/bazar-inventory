'use client'

import { Card, Empty, Typography } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Page() {
  return (
    <Card className='app-placeholder-card' bordered={false}>
      <Empty
        image={<SettingOutlined style={{ fontSize: 48, color: '#f59e0b' }} />}
        description={
          <div>
            <Title level={4} style={{ color: '#f8fbff' }}>Settings</Title>
            <Text type='secondary'>
              Configure your store preferences and account settings.
            </Text>
          </div>
        }
      />
    </Card>
  )
}
