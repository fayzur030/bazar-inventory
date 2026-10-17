'use client'

import { Card, Empty, Typography } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Page() {
  return (
    <Card className='app-placeholder-card' bordered={false}>
      <Empty
        image={<QuestionCircleOutlined style={{ fontSize: 48, color: '#0ea5e9' }} />}
        description={
          <div>
            <Title level={4} style={{ color: '#f8fbff' }}>Help Center</Title>
            <Text type='secondary'>
              Get help with using Bazar Inventory and find answers to common questions.
            </Text>
          </div>
        }
      />
    </Card>
  )
}
