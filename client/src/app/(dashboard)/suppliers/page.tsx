'use client'

import { Card, Empty, Typography } from 'antd'
import { TruckOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Page() {
  return (
    <Card className='app-placeholder-card' bordered={false}>
      <Empty
        image={<TruckOutlined style={{ fontSize: 48, color: '#ec4899' }} />}
        description={
          <div>
            <Title level={4} style={{ color: '#f8fbff' }}>Suppliers</Title>
            <Text type='secondary'>
              Manage your supplier relationships and contacts.
            </Text>
          </div>
        }
      />
    </Card>
  )
}
