'use client'

import { Button, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { getALlProducts } from '@/services/getProductService'
import Image from 'next/image'
import ActionButton from './ActionButton'

const { Text } = Typography

interface ProductRecord {
  key: string
  image: string
  name: string
  category: string
  unit: string
  price: number
  stock: number
  status: 'active' | 'inactive'
}

const ProductsTable = () => {
  const [products, setProducts] = useState<ProductRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getALlProducts().then((data) => {
      setProducts(
        data.map((p) => ({
          key: p._id,
          image: p.image,
          name: p.name,
          category: p.category,
          unit: p.unit,
          price: p.price,
          stock: p.stock,
          status: p.status,
        }))
      )
      setLoading(false)
    })
  }, [])

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
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status}
        </Tag>
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
      <div className='app-products-header'>
        <div>
          <Text strong style={{ fontSize: 20, color: '#f8fbff' }}>
            All Products: {products.length}
          </Text>
          <br />
          <Text type='secondary' style={{ fontSize: 13 }}>
            Manage your products, stock and pricing
          </Text>
        </div>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          style={{
            background: 'linear-gradient(135deg, #4f46e5, #2563eb)',
            border: 'none',
            borderRadius: 10,
          }}
        >
          Add Product
        </Button>
      </div>

      <Table
        dataSource={products}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        className='app-table'
        scroll={{ x: 800 }}
      />
    </div>
  )
}

export default ProductsTable
