'use client'
import { useState } from 'react'
import { Button, Flex, Modal } from 'antd'
import { Plus } from 'lucide-react'
import { Form, Input, InputNumber, Select } from 'antd'
import { ProductRecord } from './ProductsTable'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface ProductsProps {
  products: ProductRecord[]
}

const AddProductModal = ({ products }: ProductsProps) => {
  const router = useRouter()
  const [form] = Form.useForm<ProductsProps>()
  const [openResponsive, setOpenResponsive] = useState(false)

  const handleAddProduct = async (value: ProductsProps) => {
    try {
      const res = await fetch('https://bazar-inventory.onrender.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      })

      if (!res.ok) {
        throw new Error('Failed to add product')
      }

      toast.success('Product added successfully!')

      form.resetFields()
      setOpenResponsive(false)
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to add product!')
    }
  }

  return (
    <Flex vertical gap='medium' align='flex-start'>
      {/* Responsive */}
      <Button
        type='primary'
        onClick={() => setOpenResponsive(true)}
        style={{
          background: 'linear-gradient(135deg, #4f46e5, #2563eb)',
          border: 'none',
          borderRadius: 10,
        }}
      >
        <Plus size={16} /> Add Product
      </Button>
      <Modal
        title='Modal responsive width'
        centered
        open={openResponsive}
        onOk={() => form.submit()}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={handleAddProduct}
          initialValues={{
            status: 'active',
            stock: 0,
            price: 0,
            unit: 'kg',
          }}
        >
          {/* Product Image */}
          <Form.Item
            label='Product Image URL'
            name='image'
            rules={[
              { required: true, message: 'Please enter product image URL' },
            ]}
          >
            <Input placeholder='https://example.com/product.jpg' />
          </Form.Item>

          {/* Product Name */}
          <Form.Item
            label='Product Name'
            name='name'
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder='e.g. Fresh Carrot' />
          </Form.Item>

          {/* Category */}
          <Form.Item
            label='Category'
            name='category'
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select
              placeholder='Select product category'
              options={[
                ...new Set(products.map((product) => product.category)),
              ].map((category) => ({
                label: category,
                value: category,
              }))}
            />
          </Form.Item>

          {/* Unit */}
          <Form.Item
            label='Unit'
            name='unit'
            rules={[{ required: true, message: 'Please select a unit' }]}
          >
            <Select
              placeholder='Select product unit'
              options={[
                ...new Set(products.map((product) => product.unit)),
              ].map((unit) => ({
                label: unit,
                value: unit,
              }))}
            />
          </Form.Item>

          {/* Price and Stock */}
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <Form.Item
              label='Price (৳)'
              name='price'
              rules={[
                { required: true, message: 'Please enter price' },
                {
                  type: 'number',
                  min: 0,
                  message: 'Price cannot be negative',
                },
              ]}
            >
              <InputNumber
                placeholder='Enter price'
                min={0}
                className='w-full'
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label='Stock Quantity'
              name='stock'
              rules={[
                { required: true, message: 'Please enter stock quantity' },
                {
                  type: 'number',
                  min: 0,
                  message: 'Stock cannot be negative',
                },
              ]}
            >
              <InputNumber
                placeholder='Enter stock'
                min={0}
                className='w-full'
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>

          {/* Status Select */}
          <Form.Item
            label='Product Status'
            name='status'
            rules={[
              { required: true, message: 'Please select product status' },
            ]}
          >
            <Select
              options={[
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  )
}

export default AddProductModal
