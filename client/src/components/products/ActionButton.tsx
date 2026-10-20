'use client'

import { Ellipsis, Eye, PencilIcon, TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { EditProductModal, type ProductProps } from './EditProductModal'
import { useState } from 'react'
import Link from 'next/link'
import ProductDeleteDialog from './ProductDeleteDialog'

export function ActionButton({ product, categories, unites }: ProductProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

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
              onClick={() => {
                setDeleteOpen(true)
              }}
            >
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <EditProductModal
        product={product}
        categories={categories}
        unites={unites}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      {/* Delete dialog */}
      <ProductDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        product={product}
      />
    </>
  )
}
