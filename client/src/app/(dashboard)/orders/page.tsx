'use client'

import { Card, Empty, Typography } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Page() {
  return (
    <Card className='app-placeholder-card' bordered={false}>
      <Empty
        image={<ShoppingCartOutlined style={{ fontSize: 48, color: '#34d399' }} />}
        description={
          <div>
            <Title level={4} style={{ color: '#f8fbff' }}>Orders</Title>
            <Text type='secondary'>
              Track, manage, and fulfill customer orders.
            </Text>
          </div>
        }
      />
    </Card>
  )
}
