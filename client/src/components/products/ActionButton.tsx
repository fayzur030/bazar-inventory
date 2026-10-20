'use client'

import { Ellipsis, Eye, PencilIcon, ShareIcon, TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { EditProductModal, type ProductProps } from './EditProductModal'
import { useState } from 'react'
import Link from 'next/link'

export function ActionButton({ product, categories, unites }: ProductProps) {
  const [editOpen, setEditOpen] = useState(false)
  const router = useRouter()
  const handleDeleteProduct = async (productId: string) => {
    try {
      const res = await fetch(
        `https://bazar-inventory.onrender.com/products/${productId}`,
        {
          method: 'DELETE',
        }
      )

      if (!res.ok) {
        throw new Error('Failed to delete product')
      }

      toast.success('Product deleted successfully!')
      router.refresh()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant='outline' size='icon'>
              <Ellipsis />
            </Button>
          }
        />

        <DropdownMenuContent align='end'>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setEditOpen(true)
              }}
            >
              <PencilIcon size={16} />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                href={`/dashboard/products/${product._id}`}
                className='flex items-center gap-2'
              >
                <Eye size={16} />
                View Details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              variant='destructive'
              onSelect={() => handleDeleteProduct(product._id)}
            >
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProductModal
        product={product}
        categories={categories}
        unites={unites}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  )
}
