'use client'

import { Ellipsis, ShareIcon, TrashIcon } from 'lucide-react'

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

export function ActionButton({ product, categories, unites }: ProductProps) {
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
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`text-center items-center`}
        render={
          <Button variant='outline'>
            <Ellipsis />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <EditProductModal
            product={product}
            categories={categories}
            unites={unites}
          />
          <DropdownMenuItem>
            <ShareIcon />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant='destructive'
            onClick={() => handleDeleteProduct(product._id)}
          >
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
