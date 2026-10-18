'use client'

import * as React from 'react'
import { cn } from 'cn'

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
// import { useMediaQuery } from '@/hooks/use-media-query'
import { Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type AddProductModalProps = {
  categories: string[]
  unites: string[]
}

export function AddProductModal({ categories, unites }: AddProductModalProps) {
  const [open, setOpen] = React.useState(false)
  // const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant='outline'>
            <Plus /> Add Product
          </Button>
        }
      />
      <DialogContent className='sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle> Add Product</DialogTitle>
          <DialogDescription>
            Add a new product to your inventory by entering its details,
            pricing, and stock information.
          </DialogDescription>
        </DialogHeader>
        <AddProductForm
          categories={categories}
          unites={unites}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

type AddProductFormProps = React.ComponentProps<'form'> & {
  categories: string[]
  unites: string[]
  onSuccess: () => void
}

function AddProductForm({
  className,
  categories,
  unites,
  onSuccess,
}: AddProductFormProps) {
  const router = useRouter()
  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newProduct = Object.fromEntries(formData.entries())
    console.log(newProduct)
    try {
      const res = await fetch(`https://bazar-inventory.onrender.com/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(newProduct),
      })

      if (!res.ok) {
        throw new Error('Add to product failed')
      }
    } catch (error) {
      console.log(error)
    }
    router.refresh()
    toast.success('Product added successfully')
    onSuccess()
  }
  return (
    <form
      className={cn(
        'grid grid-cols-1 items-start gap-4 sm:grid-cols-2',
        className
      )}
      onSubmit={handleAddProduct}
    >
      <div className='grid gap-2'>
        <Label htmlFor='name'>Product Name</Label>
        <Input id='name' name='name' placeholder='Fresh Bananas' />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='category'>Category</Label>
        <Select name='category'>
          <SelectTrigger id='category' name='category' className='w-full'>
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

      <div className='grid gap-2'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          name='description'
          placeholder='Fresh ripe bananas for everyday consumption.'
          rows={2}
        />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='image'>Image URL</Label>
        <Input
          id='image'
          name='image'
          type='url'
          placeholder='https://placehold.co/400x300?text=Bananas'
        />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='price'>Selling Price</Label>
        <Input id='price' type='number' name='price' placeholder='80' />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='costPrice'>Cost Price</Label>
        <Input id='costPrice' type='number' name='costPrice' placeholder='60' />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='stock'>Stock Quantity</Label>
        <Input id='stock' name='stock' type='number' placeholder='25' />
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='unit'>Unit</Label>
        <Select name='unit'>
          <SelectTrigger id='unit' name='unit' className='w-full'>
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

      <div className='grid gap-2'>
        <Label htmlFor='status'>Status</Label>
        <Select name='status'>
          <SelectTrigger id='status' className='w-full'>
            <SelectValue placeholder='Select status' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='active'>Active</SelectItem>
            <SelectItem value='inactive'>Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid gap-2'>
        <Label htmlFor='lowStockThreshold'>Low Stock Threshold</Label>
        <Input
          id='lowStockThreshold'
          name='lowStockThreshold'
          type='number'
          placeholder='10'
        />
      </div>

      <div className='flex justify-end sm:col-span-2'>
        <Button type='submit'>Save Product</Button>
      </div>
    </form>
  )
}
