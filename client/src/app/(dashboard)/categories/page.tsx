'use client'

import { Card, Empty, Typography } from 'antd'
import { TagsOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Page() {
  return (
    <Card className='app-placeholder-card' bordered={false}>
      <Empty
        image={<TagsOutlined style={{ fontSize: 48, color: '#2563eb' }} />}
        description={
          <div>
            <Title level={4} style={{ color: '#f8fbff' }}>Categories</Title>
            <Text type='secondary'>
              Organize products into categories for better management.
            </Text>
          </div>
        }
      />
    </Card>
  )
}
