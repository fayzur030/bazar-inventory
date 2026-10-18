'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card } from '../ui/card'
import { AddProductModal } from './AddProductModal'
import Image from 'next/image'
import { ActionButton } from './ActionButton'
import { Product } from '@/types/ProductTypes'

interface Props {
  products: Product[]
}

const ProductsTableClient = ({ products }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 7
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage)

  const productHeader = [
    'Image',
    'Product Name',
    'Category',
    'Price',
    'Cost Price',
    'Stock',
    'Unit',
    'Status',
    'Actions',
  ]

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  )

  const unites = Array.from(new Set(products.map((product) => product.unit)))

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <h1 className='text-xl font-semibold text-slate-600 dark:text-slate-300 md:text-3xl'>
            All Products: {products.length}
          </h1>

          <p className='text-xs text-gray-600 dark:text-gray-400 md:text-sm'>
            View, manage, and track your products and stock levels.
          </p>
        </div>

        <AddProductModal categories={categories} unites={unites} />
      </div>

      <Card className='mt-9 overflow-x-auto px-2'>
        <Table>
          <TableHeader>
            <TableRow>
              {productHeader.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Image
                      src={
                        product.image?.startsWith('http')
                          ? product.image
                          : '/placeholder.png'
                      }
                      alt={product.name}
                      width={40}
                      height={40}
                      className='size-10 rounded-md object-cover'
                    />
                  </TableCell>

                  <TableCell className='font-medium'>{product.name}</TableCell>

                  <TableCell>{product.category}</TableCell>

                  <TableCell>৳{product.price}</TableCell>

                  <TableCell>৳{product.costPrice}</TableCell>

                  <TableCell>
                    <span
                      className={
                        product.stock <= product.lowStockThreshold
                          ? 'text-red-500'
                          : 'text-green-600'
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>

                  <TableCell>{product.unit}</TableCell>

                  <TableCell>
                    <span
                      className={
                        product.status === 'active'
                          ? 'rounded-full bg-green-100 px-2 py-1 text-xs text-green-700'
                          : 'rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600'
                      }
                    >
                      {product.status}
                    </span>
                  </TableCell>

                  <TableCell className='text-right align-middle'>
                    <div className='flex items-center justify-between'>
                      <ActionButton product={product} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={productHeader.length}
                  className='py-10 text-center'
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className='flex flex-col items-center justify-between gap-3 border-t px-2 py-4 sm:flex-row'>
          <p className='text-sm text-muted-foreground'>
            Showing {products.length === 0 ? 0 : startIndex + 1} to{' '}
            {Math.min(startIndex + itemsPerPage, products.length)} of{' '}
            {products.length} products
          </p>

          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </Button>

            <span className='text-sm'>
              {currentPage} / {Math.max(totalPages, 1)}
            </span>

            <Button
              variant='outline'
              size='sm'
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProductsTableClient
