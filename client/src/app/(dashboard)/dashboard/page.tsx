'use client'

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  ShoppingOutlined,
  InboxOutlined,
  WarningOutlined,
  PlusOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  TeamOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  List,
  Progress,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'

const { Title, Text } = Typography

// ─── Stats Data ───────────────────────────────────────────────
const stats = [
  {
    title: 'Total Revenue',
    value: '৳847,520',
    prefix: <DollarOutlined />,
    change: '+12.5%',
    trend: 'up',
    color: '#4f46e5',
    bg: 'rgba(79, 70, 229, 0.12)',
  },
  {
    title: 'Total Orders',
    value: '2,847',
    prefix: <ShoppingOutlined />,
    change: '+8.2%',
    trend: 'up',
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.12)',
  },
  {
    title: 'Total Products',
    value: '1,284',
    prefix: <InboxOutlined />,
    change: '+3.1%',
    trend: 'up',
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.12)',
  },
  {
    title: 'Low Stock Items',
    value: '23',
    prefix: <WarningOutlined />,
    change: '-2.4%',
    trend: 'down',
    color: '#f87171',
    bg: 'rgba(248, 113, 113, 0.12)',
  },
]

// ─── Revenue Chart Data ───────────────────────────────────────
const revenueData = [
  { month: 'Jan', revenue: 4200, orders: 120 },
  { month: 'Feb', revenue: 5800, orders: 180 },
  { month: 'Mar', revenue: 5200, orders: 150 },
  { month: 'Apr', revenue: 7800, orders: 240 },
  { month: 'May', revenue: 6900, orders: 210 },
  { month: 'Jun', revenue: 8400, orders: 280 },
  { month: 'Jul', revenue: 7600, orders: 250 },
  { month: 'Aug', revenue: 9200, orders: 310 },
  { month: 'Sep', revenue: 8800, orders: 290 },
  { month: 'Oct', revenue: 10500, orders: 350 },
  { month: 'Nov', revenue: 9800, orders: 320 },
  { month: 'Dec', revenue: 12400, orders: 410 },
]

const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))
const maxOrders = Math.max(...revenueData.map((d) => d.orders))

// ─── Category Data ────────────────────────────────────────────
const categories = [
  { name: 'Electronics', value: 35, color: '#4f46e5' },
  { name: 'Clothing', value: 25, color: '#2563eb' },
  { name: 'Food & Beverage', value: 20, color: '#34d399' },
  { name: 'Home & Garden', value: 12, color: '#fbbf24' },
  { name: 'Others', value: 8, color: '#f472b6' },
]

// ─── Recent Orders ────────────────────────────────────────────
interface OrderRecord {
  key: string
  id: string
  customer: string
  product: string
  amount: string
  status: 'completed' | 'processing' | 'pending' | 'cancelled'
  date: string
}

const recentOrders: OrderRecord[] = [
  {
    key: '1',
    id: '#ORD-7841',
    customer: 'Rahim Uddin',
    product: 'Wireless Earbuds Pro',
    amount: '৳3,500',
    status: 'completed',
    date: '2 min ago',
  },
  {
    key: '2',
    id: '#ORD-7840',
    customer: 'Fatima Begum',
    product: 'Cotton Panjabi (Premium)',
    amount: '৳1,850',
    status: 'processing',
    date: '15 min ago',
  },
  {
    key: '3',
    id: '#ORD-7839',
    customer: 'Karim Sheikh',
    product: 'Organic Honey 500g',
    amount: '৳720',
    status: 'completed',
    date: '32 min ago',
  },
  {
    key: '4',
    id: '#ORD-7838',
    customer: 'Nusrat Jahan',
    product: 'Leather Wallet',
    amount: '৳2,400',
    status: 'pending',
    date: '1 hr ago',
  },
  {
    key: '5',
    id: '#ORD-7837',
    customer: 'Arif Hassan',
    product: 'Bluetooth Speaker',
    amount: '৳4,200',
    status: 'completed',
    date: '2 hr ago',
  },
  {
    key: '6',
    id: '#ORD-7836',
    customer: 'Sadia Rahman',
    product: 'Silk Saree (Handloom)',
    amount: '৳6,800',
    status: 'cancelled',
    date: '3 hr ago',
  },
]

const orderColumns: ColumnsType<OrderRecord> = [
  {
    title: 'Order',
    dataIndex: 'id',
    key: 'id',
    render: (id: string) => <Text strong>{id}</Text>,
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    render: (name: string) => <Text>{name}</Text>,
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    render: (name: string) => <Text type='secondary'>{name}</Text>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: string) => <Text strong>{amount}</Text>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: OrderRecord['status']) => {
      const colorMap = {
        completed: 'success',
        processing: 'processing',
        pending: 'warning',
        cancelled: 'error',
      } as const
      return (
        <Tag color={colorMap[status]} className='capitalize'>
          {status}
        </Tag>
      )
    },
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date: string) => <Text type='secondary'>{date}</Text>,
  },
]

// ─── Top Products ─────────────────────────────────────────────
const topProducts = [
  {
    rank: 1,
    name: 'Wireless Earbuds Pro',
    sku: 'WEP-001',
    sales: 342,
    revenue: '৳1,197,000',
    stock: 85,
    trend: 'up',
  },
  {
    rank: 2,
    name: 'Cotton Panjabi (Premium)',
    sku: 'CP-002',
    sales: 289,
    revenue: '৳534,650',
    stock: 120,
    trend: 'up',
  },
  {
    rank: 3,
    name: 'Organic Honey 500g',
    sku: 'OH-003',
    sales: 256,
    revenue: '৳184,320',
    stock: 45,
    trend: 'down',
  },
  {
    rank: 4,
    name: 'Leather Wallet',
    sku: 'LW-004',
    sales: 198,
    revenue: '৳475,200',
    stock: 62,
    trend: 'up',
  },
  {
    rank: 5,
    name: 'Bluetooth Speaker',
    sku: 'BS-005',
    sales: 167,
    revenue: '৳701,400',
    stock: 28,
    trend: 'down',
  },
]

// ─── Quick Actions ────────────────────────────────────────────
const quickActions = [
  { label: 'Add Product', icon: <PlusOutlined />, color: '#4f46e5' },
  { label: 'New Order', icon: <ShoppingCartOutlined />, color: '#2563eb' },
  { label: 'Add Supplier', icon: <TruckOutlined />, color: '#f59e0b' },
  { label: 'Add Customer', icon: <TeamOutlined />, color: '#ec4899' },
  { label: 'View Reports', icon: <FileTextOutlined />, color: '#0ea5e9' },
]

// ─── Component ────────────────────────────────────────────────
export default function DashboardPage() {
  // Build conic-gradient for donut
  const gradientStops = categories
    .reduce<{ stops: string[]; cumulative: number }>(
      (acc, cat) => {
        const start = acc.cumulative
        acc.cumulative += cat.value
        acc.stops.push(`${cat.color} ${start}% ${acc.cumulative}%`)
        return acc
      },
      { stops: [], cumulative: 0 }
    )
    .stops.join(', ')

  return (
    <div className='app-dashboard'>
      {/* Page Header */}
      <div className='app-page-header'>
        <div>
          <Title level={2} style={{ margin: 0, color: '#f8fbff' }}>
            Dashboard
          </Title>
          <Text type='secondary' style={{ fontSize: 14 }}>
            Welcome back! Here&apos;s what&apos;s happening with your store
            today.
          </Text>
        </div>
        <Space>
          <Button icon={<EyeOutlined />}>Export</Button>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #2563eb)',
              border: 'none',
            }}
          >
            Add Product
          </Button>
        </Space>
      </div>

      {/* Stats Grid */}
      <Row gutter={[16, 16]} className='app-stats-row'>
        {stats.map((stat) => (
          <Col xs={24} sm={12} xl={6} key={stat.title}>
            <Card className='app-stat-card' hoverable>
              <div className='app-stat-inner'>
                <div className='app-stat-text'>
                  <Text type='secondary' className='app-stat-title'>
                    {stat.title}
                  </Text>
                  <div className='app-stat-value'>{stat.value}</div>
                </div>
                <div
                  className='app-stat-icon'
                  style={{ background: stat.bg, color: stat.color }}
                >
                  {stat.prefix}
                </div>
              </div>
              <div className='app-stat-footer'>
                {stat.trend === 'up' ? (
                  <ArrowUpOutlined style={{ color: '#34d399' }} />
                ) : (
                  <ArrowDownOutlined style={{ color: '#f87171' }} />
                )}
                <Text
                  strong
                  style={{
                    color: stat.trend === 'up' ? '#34d399' : '#f87171',
                    fontSize: 13,
                  }}
                >
                  {stat.change}
                </Text>
                <Text type='secondary' style={{ fontSize: 12 }}>
                  vs last month
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <Card className='app-quick-card' bordered={false}>
        <Title level={5} style={{ margin: '0 0 16px', color: '#f8fbff' }}>
          Quick Actions
        </Title>
        <div className='app-quick-actions'>
          {quickActions.map((action) => (
            <Button
              key={action.label}
              size='large'
              className='app-quick-btn'
              icon={action.icon}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Charts Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card className='app-chart-card' bordered={false}>
            <div className='app-card-header'>
              <div>
                <Title level={5} style={{ margin: 0, color: '#f8fbff' }}>
                  Revenue Overview
                </Title>
                <Text type='secondary' style={{ fontSize: 12 }}>
                  Monthly revenue and order trends
                </Text>
              </div>
              <Space size={16}>
                <Space size={4}>
                  <span
                    className='app-legend-dot'
                    style={{ background: '#4f46e5' }}
                  />
                  <Text type='secondary' style={{ fontSize: 12 }}>
                    Revenue
                  </Text>
                </Space>
                <Space size={4}>
                  <span
                    className='app-legend-dot'
                    style={{ background: '#34d399' }}
                  />
                  <Text type='secondary' style={{ fontSize: 12 }}>
                    Orders
                  </Text>
                </Space>
              </Space>
            </div>

            {/* Bar Chart */}
            <div className='app-bar-chart'>
              <div className='app-chart-grid'>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className='app-chart-grid-line' />
                ))}
              </div>
              <div className='app-chart-bars'>
                {revenueData.map((d) => (
                  <div key={d.month} className='app-chart-col'>
                    <div className='app-chart-col-inner'>
                      <div
                        className='app-bar app-bar-revenue'
                        style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                      />
                      <div
                        className='app-bar app-bar-orders'
                        style={{ height: `${(d.orders / maxOrders) * 100}%` }}
                      />
                    </div>
                    <Text type='secondary' className='app-chart-label'>
                      {d.month}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card className='app-chart-card' bordered={false}>
            <div className='app-card-header'>
              <div>
                <Title level={5} style={{ margin: 0, color: '#f8fbff' }}>
                  Sales by Category
                </Title>
                <Text type='secondary' style={{ fontSize: 12 }}>
                  Distribution across categories
                </Text>
              </div>
            </div>

            <div className='app-donut-section'>
              {/* Donut */}
              <div className='app-donut-wrap'>
                <div
                  className='app-donut'
                  style={{ background: `conic-gradient(${gradientStops})` }}
                >
                  <div className='app-donut-center'>
                    <Text strong style={{ fontSize: 22, color: '#f8fbff' }}>
                      100%
                    </Text>
                    <Text
                      type='secondary'
                      style={{
                        fontSize: 10,
                        textTransform: 'uppercase',
                        letterSpacing: 1.5,
                      }}
                    >
                      Total
                    </Text>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className='app-donut-legend'>
                {categories.map((cat) => (
                  <div key={cat.name} className='app-legend-row'>
                    <Space size={8}>
                      <span
                        className='app-legend-dot'
                        style={{ background: cat.color }}
                      />
                      <Text style={{ fontSize: 13 }}>{cat.name}</Text>
                    </Space>
                    <div className='app-legend-bar'>
                      <div className='app-legend-bar-track'>
                        <div
                          className='app-legend-bar-fill'
                          style={{
                            width: `${cat.value}%`,
                            background: cat.color,
                          }}
                        />
                      </div>
                      <Text
                        type='secondary'
                        style={{
                          fontSize: 12,
                          minWidth: 28,
                          textAlign: 'right',
                        }}
                      >
                        {cat.value}%
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Bottom Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            className='app-table-card'
            bordered={false}
            title={
              <div className='app-card-header'>
                <div>
                  <Title level={5} style={{ margin: 0, color: '#f8fbff' }}>
                    Recent Orders
                  </Title>
                  <Text type='secondary' style={{ fontSize: 12 }}>
                    Latest customer transactions
                  </Text>
                </div>
                <Button type='link' size='small'>
                  View All
                </Button>
              </div>
            }
          >
            <Table
              dataSource={recentOrders}
              columns={orderColumns}
              pagination={false}
              size='middle'
              className='app-table'
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            className='app-table-card'
            bordered={false}
            title={
              <div className='app-card-header'>
                <div>
                  <Title level={5} style={{ margin: 0, color: '#f8fbff' }}>
                    Top Products
                  </Title>
                  <Text type='secondary' style={{ fontSize: 12 }}>
                    Best sellers this month
                  </Text>
                </div>
              </div>
            }
          >
            <List
              dataSource={topProducts}
              renderItem={(item) => (
                <List.Item className='app-product-item'>
                  <div className='app-product-row'>
                    <div className={`app-product-rank app-rank-${item.rank}`}>
                      {item.rank}
                    </div>
                    <div className='app-product-info'>
                      <Text strong style={{ fontSize: 13 }}>
                        {item.name}
                      </Text>
                      <Text type='secondary' style={{ fontSize: 11 }}>
                        {item.sku} · {item.sales} sold
                      </Text>
                    </div>
                    <div className='app-product-right'>
                      <Text strong style={{ fontSize: 13 }}>
                        {item.revenue}
                      </Text>
                      <div className='app-stock-bar'>
                        <Progress
                          percent={Math.min(item.stock, 100)}
                          showInfo={false}
                          size='small'
                          strokeColor={
                            item.stock > 50
                              ? '#34d399'
                              : item.stock > 20
                                ? '#fbbf24'
                                : '#f87171'
                          }
                          trailColor='rgba(255,255,255,0.06)'
                        />
                        <Text
                          type='secondary'
                          style={{
                            fontSize: 10,
                            minWidth: 20,
                            textAlign: 'right',
                          }}
                        >
                          {item.stock}
                        </Text>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
