'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { AddProductModal } from './AddProductModal'
import { ActionButton } from './ActionButton'
import { Product } from '@/types/ProductTypes'

import { Search, Package, ArrowDownUp } from 'lucide-react'

interface Props {
  products: Product[]
}

const ProductsTableClient = ({ products }: Props) => {
  //search state
  const [searchTerm, setSearchTerm] = useState('')

  const [currentPage, setCurrentPage] = useState(1)

  // Search logic
  const filteredProduct = products.filter((product) => {
    const search = searchTerm.trim().toLowerCase()
    const searchProductByName = product.name.toLowerCase().includes(search)
    const searchProductByCategory = product.category
      .toLowerCase()
      .includes(search)
    return searchProductByName || searchProductByCategory
  })

  const itemsPerPage = 7
  const totalPages = Math.ceil(filteredProduct.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = filteredProduct.slice(
    startIndex,
    startIndex + itemsPerPage
  )

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
    <div className='w-full min-w-0 space-y-5 sm:space-y-7'>
      {/* Page Header */}
      <div className='flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-5'>
        <div className='min-w-0 space-y-2'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/20 sm:size-11 dark:text-blue-400'>
              <Package size={23} />
            </div>

            <div className='min-w-0'>
              <h1 className='text-xl font-bold tracking-tight text-slate-800 sm:text-2xl md:text-3xl dark:text-slate-100'>
                All Products
              </h1>

              <p className='mt-1 text-xs text-muted-foreground sm:text-sm'>
                Manage your inventory and stock levels.
              </p>
            </div>
          </div>

          <div className='flex items-center gap-2 pl-1 text-xs text-muted-foreground sm:text-sm'>
            <span className='size-2 shrink-0 rounded-full bg-emerald-500' />
            {products.length} products in your inventory
          </div>
        </div>

        <div className='w-full sm:w-auto sm:shrink-0'>
          <AddProductModal categories={categories} unites={unites} />
        </div>
      </div>

      {/* Products Table Card */}
      <Card className='w-full min-w-0 gap-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white py-0 shadow-sm dark:border-slate-800 dark:bg-slate-950'>
        {/* Search & Sort UI */}
        <div className='grid grid-cols-1 gap-3 border-b border-slate-200/80 p-3 dark:border-slate-800 sm:p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center'>
          <div className='relative w-full min-w-0'>
            <Search
              size={18}
              className='absolute top-1/2 left-3 -translate-y-1/2 text-slate-400'
            />

            <Input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              placeholder='Search products...'
              className='h-10 w-full rounded-xl border-slate-200 bg-slate-50 pl-10 shadow-none transition-colors focus-visible:border-blue-500 focus-visible:ring-blue-500/20 sm:h-11 dark:border-slate-800 dark:bg-slate-900'
            />
          </div>

          <div className='flex min-w-0 items-center gap-3'>
            <span className='hidden shrink-0 items-center gap-2 text-sm text-muted-foreground sm:flex'>
              <ArrowDownUp size={16} />
              Sort by
            </span>

            <Select defaultValue='newest'>
              <SelectTrigger className='h-12 w-full min-w-0 flex-1 rounded-md border-slate-200 bg-white sm:h-14 py-5 sm:w-72 sm:flex-none dark:border-slate-800 dark:bg-slate-900'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value='newest'>Newest First</SelectItem>
                  <SelectItem value='oldest'>Oldest First</SelectItem>
                  <SelectItem value='price-low'>Price: Low to High</SelectItem>
                  <SelectItem value='price-high'>Price: High to Low</SelectItem>
                  <SelectItem value='name-asc'>Name: A to Z</SelectItem>
                  <SelectItem value='name-desc'>Name: Z to A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className='w-full min-w-0 overflow-x-auto'>
          <Table className='min-w-237.5'>
            <TableHeader>
              <TableRow className='border-b border-slate-200 bg-slate-50/80 hover:bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900/60'>
                {productHeader.map((header) => (
                  <TableHead
                    key={header}
                    className='h-12 px-4 text-xs font-semibold tracking-wide whitespace-nowrap text-slate-500 uppercase dark:text-slate-400'
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <TableRow
                    key={product._id}
                    className='border-b border-slate-100 transition-colors duration-200 hover:bg-blue-50/40 dark:border-slate-800/80 dark:hover:bg-slate-900/70'
                  >
                    <TableCell className='px-4 py-3'>
                      <div className='flex size-12 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900'>
                        <Image
                          src={
                            product.image?.startsWith('http')
                              ? product.image
                              : '/placeholder.png'
                          }
                          alt={product.name}
                          width={40}
                          height={40}
                          className='size-full object-cover'
                        />
                      </div>
                    </TableCell>

                    <TableCell className='px-4 py-3'>
                      <span className='font-semibold whitespace-nowrap text-slate-800 dark:text-slate-100'>
                        {product.name}
                      </span>
                    </TableCell>

                    <TableCell className='px-4 py-3'>
                      <span className='inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-slate-600 dark:bg-slate-800 dark:text-slate-300'>
                        {product.category}
                      </span>
                    </TableCell>

                    <TableCell className='px-4 py-3 font-semibold whitespace-nowrap text-slate-800 dark:text-slate-200'>
                      ৳{product.price}
                    </TableCell>

                    <TableCell className='px-4 py-3 whitespace-nowrap text-slate-500 dark:text-slate-400'>
                      ৳{product.costPrice}
                    </TableCell>

                    <TableCell className='px-4 py-3'>
                      <span
                        className={
                          product.stock <= product.lowStockThreshold
                            ? 'inline-flex items-center gap-1.5 font-semibold whitespace-nowrap text-red-500'
                            : 'inline-flex items-center gap-1.5 font-medium whitespace-nowrap text-emerald-600 dark:text-emerald-400'
                        }
                      >
                        <span
                          className={
                            product.stock <= product.lowStockThreshold
                              ? 'size-1.5 shrink-0 rounded-full bg-red-500'
                              : 'size-1.5 shrink-0 rounded-full bg-emerald-500'
                          }
                        />
                        {product.stock}
                      </span>
                    </TableCell>

                    <TableCell className='px-4 py-3 whitespace-nowrap text-slate-500 dark:text-slate-400'>
                      {product.unit}
                    </TableCell>

                    <TableCell className='px-4 py-3'>
                      <span
                        className={
                          product.status === 'active'
                            ? 'inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-400'
                            : 'inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-500/10 dark:bg-slate-800 dark:text-slate-400'
                        }
                      >
                        <span
                          className={
                            product.status === 'active'
                              ? 'size-1.5 shrink-0 rounded-full bg-emerald-500'
                              : 'size-1.5 shrink-0 rounded-full bg-slate-400'
                          }
                        />
                        {product.status}
                      </span>
                    </TableCell>

                    <TableCell className='px-4 py-3 text-right'>
                      <div className='flex items-center justify-end'>
                        <ActionButton
                          product={product}
                          categories={categories}
                          unites={unites}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={productHeader.length}
                    className='h-40 text-center'
                  >
                    <div className='flex flex-col items-center justify-center gap-2'>
                      <Package
                        size={32}
                        className='text-slate-300 dark:text-slate-600'
                      />

                      <p className='font-medium text-slate-600 dark:text-slate-300'>
                        No products found.
                      </p>

                      <p className='text-sm text-muted-foreground'>
                        Your products will appear here.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className='flex flex-col gap-3 border-t border-slate-200/80 bg-slate-50/50 px-3 py-4 dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
          <p className='text-center text-xs text-muted-foreground sm:text-left sm:text-sm'>
            Showing{' '}
            <span className='font-semibold text-slate-700 dark:text-slate-200'>
              {filteredProduct.length === 0 ? 0 : startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, filteredProduct.length)}
            </span>{' '}
            of{' '}
            <span className='font-semibold text-slate-700 dark:text-slate-200'>
              {filteredProduct.length}
            </span>{' '}
            products
          </p>

          <div className='flex items-center justify-center gap-2 sm:justify-end'>
            <Button
              variant='outline'
              size='sm'
              className='h-9 rounded-lg px-3 sm:px-4'
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </Button>

            <div className='flex h-9 min-w-16 items-center justify-center rounded-lg border border-slate-200 bg-white px-2 text-sm font-semibold text-slate-700 sm:min-w-20 sm:px-3 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'>
              {currentPage} / {Math.max(totalPages, 1)}
            </div>

            <Button
              variant='outline'
              size='sm'
              className='h-9 rounded-lg px-3 sm:px-4'
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
