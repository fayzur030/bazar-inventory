'use client'
import { Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import Image from 'next/image'
import ActionButton from './ActionButton'
import AddProductModal from './AddProductModal'

const { Text } = Typography

export interface ProductRecord {
  key: string
  image: string
  name: string
  category: string
  unit: string
  price: number
  stock: number
  status: 'active' | 'inactive'
}

interface ProductsTableClientProps {
  products: ProductRecord[]
}

const ProductsTable = ({ products }: ProductsTableClientProps) => {
  const columns: ColumnsType<ProductRecord> = [
    {
      title: '#',
      key: 'index',
      width: 50,
      render: (_: unknown, __: unknown, idx: number) => (
        <Text type='secondary'>{idx + 1}</Text>
      ),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 70,
      render: (src: string) => (
        <Image
          src={src}
          alt='Product'
          width={40}
          height={40}
          className='rounded-lg object-cover'
        />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => <Tag color='processing'>{cat}</Tag>,
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      render: (unit: string) => <Text type='secondary'>{unit}</Text>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <Text strong>৳{price}</Text>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Text
          strong
          style={{
            color: stock > 50 ? '#34d399' : stock > 20 ? '#fbbf24' : '#f87171',
          }}
        >
          {stock}
        </Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'active' | 'inactive') => (
        <Tag color={status === 'active' ? 'success' : 'error'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: () => <ActionButton />,
    },
  ]

  return (
    <div className='app-products'>
      <div className=' flex items-center justify-between'>
        <div>
          <Text strong style={{ fontSize: 20, color: '#f8fbff' }}>
            All Products: {products.length}
          </Text>
          <br />
          <Text type='secondary' style={{ fontSize: 13 }}>
            Manage your products, <br className='block md:hidden' /> stock and
            pricing
          </Text>
        </div>

        <AddProductModal products={products} />
      </div>

      <Table
        dataSource={products}
        columns={columns}
        // loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        className='app-table'
        scroll={{ x: 800 }}
      />
    </div>
  )
}

export default ProductsTable
