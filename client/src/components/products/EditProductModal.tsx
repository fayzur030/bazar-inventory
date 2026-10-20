'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { PencilIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Product } from '@/types/ProductTypes'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export interface ProductProps {
  product: Product
  categories: string[]
  unites: string[]
}

export function EditProductModal({
  product,
  categories,
  unites,
}: ProductProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button type='button' className='ml-2 flex items-center gap-2'>
            <PencilIcon size={16} />
            Edit
          </button>
        }
      />

      <DialogContent className='sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update your product information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <EditProductForm
          product={product}
          categories={categories}
          unites={unites}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

type EditProductFormProps = React.ComponentProps<'form'> & {
  product: Product
  categories: string[]
  unites: string[]
  onSuccess: () => void
}

function EditProductForm({
  className,
  product,
  categories,
  unites,
  onSuccess,
}: EditProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleUpdateProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const updatedProduct = {
      name: String(formData.get('name') ?? '').trim(),
      category: String(formData.get('category') ?? ''),
      description: String(formData.get('description') ?? '').trim(),
      image: String(formData.get('image') ?? '').trim(),
      price: Number(formData.get('price')),
      costPrice: Number(formData.get('costPrice')),
      stock: Number(formData.get('stock')),
      unit: String(formData.get('unit') ?? ''),
      status: String(formData.get('status') ?? ''),
      lowStockThreshold: Number(formData.get('lowStockThreshold')),
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(
        `https://bazar-inventory.onrender.com/products/${product._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update product')
      }

      toast.success('Product updated successfully!')

      onSuccess()
      router.refresh()
    } catch (error) {
      console.error('Error updating product:', error)
      toast.error('Failed to update product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className={cn(
        'grid grid-cols-1 items-start gap-4 sm:grid-cols-2',
        className
      )}
      onSubmit={handleUpdateProduct}
    >
      {/* Product Name */}
      <div className='grid gap-2'>
        <Label htmlFor='name'>Product Name</Label>
        <Input
          id='name'
          name='name'
          placeholder='Product name'
          defaultValue={product.name}
          required
        />
      </div>

      {/* Category */}
      <div className='grid gap-2'>
        <Label htmlFor='category'>Category</Label>

        <Select
          key={`${product._id}-category`}
          name='category'
          defaultValue={product.category}
          required
        >
          <SelectTrigger id='category' className='w-full'>
            <SelectValue placeholder='Select category' />
          </SelectTrigger>

          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className='grid gap-2'>
        <Label htmlFor='description'>Description</Label>

        <Textarea
          id='description'
          name='description'
          placeholder='Enter product description'
          rows={3}
          defaultValue={product.description}
        />
      </div>

      {/* Image URL */}
      <div className='grid gap-2'>
        <Label htmlFor='image'>Image URL</Label>

        <Input
          id='image'
          name='image'
          type='url'
          placeholder='https://example.com/product.jpg'
          defaultValue={product.image}
        />
      </div>

      {/* Selling Price */}
      <div className='grid gap-2'>
        <Label htmlFor='price'>Selling Price</Label>

        <Input
          id='price'
          name='price'
          type='number'
          min='0'
          step='any'
          placeholder='80'
          defaultValue={product.price}
          required
        />
      </div>

      {/* Cost Price */}
      <div className='grid gap-2'>
        <Label htmlFor='costPrice'>Cost Price</Label>

        <Input
          id='costPrice'
          name='costPrice'
          type='number'
          min='0'
          step='any'
          placeholder='60'
          defaultValue={product.costPrice}
          required
        />
      </div>

      {/* Stock */}
      <div className='grid gap-2'>
        <Label htmlFor='stock'>Stock Quantity</Label>

        <Input
          id='stock'
          name='stock'
          type='number'
          min='0'
          step='1'
          placeholder='25'
          defaultValue={product.stock}
          required
        />
      </div>

      {/* Unit */}
      <div className='grid gap-2'>
        <Label htmlFor='unit'>Unit</Label>

        <Select
          key={`${product._id}-unit`}
          name='unit'
          defaultValue={product.unit}
          required
        >
          <SelectTrigger id='unit' className='w-full'>
            <SelectValue placeholder='Select unit' />
          </SelectTrigger>

          <SelectContent>
            {unites.map((unit) => (
              <SelectItem key={unit} value={unit}>
                {unit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className='grid gap-2'>
        <Label htmlFor='status'>Status</Label>

        <Select
          key={`${product._id}-status`}
          name='status'
          defaultValue={product.status}
          required
        >
          <SelectTrigger id='status' className='w-full'>
            <SelectValue placeholder='Select status' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='active'>Active</SelectItem>
            <SelectItem value='inactive'>Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Low Stock Threshold */}
      <div className='grid gap-2'>
        <Label htmlFor='lowStockThreshold'>Low Stock Threshold</Label>

        <Input
          id='lowStockThreshold'
          name='lowStockThreshold'
          type='number'
          min='0'
          step='1'
          placeholder='10'
          defaultValue={product.lowStockThreshold}
          required
        />
      </div>

      {/* Submit */}
      <div className='flex justify-end gap-2 sm:col-span-2'>
        <Button
          type='button'
          variant='outline'
          onClick={() => onSuccess()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </Button>
      </div>
    </form>
  )
}
