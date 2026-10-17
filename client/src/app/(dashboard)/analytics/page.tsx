'use client'

import { Card, Empty, Typography } from 'antd'
import { BarChartOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Page() {
  return (
    <Card className='app-placeholder-card' bordered={false}>
      <Empty
        image={<BarChartOutlined style={{ fontSize: 48, color: '#4f46e5' }} />}
        description={
          <div>
            <Title level={4} style={{ color: '#f8fbff' }}>Analytics</Title>
            <Text type='secondary'>
              Sales trends, top products, and performance insights.
            </Text>
          </div>
        }
      />
    </Card>
  )
}
