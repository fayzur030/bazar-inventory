import { Product } from '@/types/ProductTypes'
import {
  ArrowLeft,
  Barcode,
  Box,
  CircleDollarSign,
  Package,
  Tag,
  TrendingUp,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductDetailsProps {
  details: Product
}

const ProductDetails = ({ details }: ProductDetailsProps) => {
  const profit = details.price - details.costPrice

  const profitMargin =
    details.price > 0 ? ((profit / details.price) * 100).toFixed(1) : '0.0'

  const isLowStock = details.stock <= details.lowStockThreshold

  return (
    <div className='min-h-screen space-y-6 bg-background p-4 text-foreground sm:p-6 lg:p-8'>
      {/* Header */}
      <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
        <div>
          <Link
            href='/dashboard/products'
            className='mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground'
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>

          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
            Product Details
          </h1>

          <p className='mt-2 text-sm text-muted-foreground'>
            View product information, pricing, and inventory details.
          </p>
        </div>

        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${
            details.status === 'active'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              details.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
            }`}
          />
          {details.status === 'active' ? 'Active Product' : 'Inactive Product'}
        </span>
      </div>

      {/* Main Product Section */}
      <div className='grid gap-6 xl:grid-cols-[1fr_1.2fr]'>
        {/* Product Image & Information */}
        <div className='overflow-hidden rounded-xl border border-border bg-card shadow-sm'>
          <div className='relative flex h-72 items-center justify-center sm:h-96'>
            {details.image ? (
              <Image
                src={details.image}
                alt={details.name}
                fill
                sizes='(max-width: 1280px) 100vw, 40vw'
                className='object-contain p-8'
                unoptimized
              />
            ) : (
              <Package size={90} className='text-muted-foreground' />
            )}

            <span className='absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg border border-border bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur'>
              <Tag size={14} className='text-primary' />
              {details.category}
            </span>
          </div>

          <div className='space-y-5 p-5 sm:p-6'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
                {details.name}
              </h2>

              <p className='mt-3 text-sm leading-6 text-muted-foreground'>
                {details.description || 'No description available.'}
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-3 border-t border-border pt-4'>
              <div className='flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2'>
                <Barcode size={16} className='text-muted-foreground' />
                <span className='text-sm text-foreground'>
                  SKU: {details.sku}
                </span>
              </div>

              <div className='flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2'>
                <Package size={16} className='text-muted-foreground' />
                <span className='text-sm text-foreground'>
                  Unit: {details.unit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className='space-y-6'>
          {/* Price Cards */}
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md'>
              <div className='flex items-center justify-between gap-3'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Selling Price
                </p>

                <div className='rounded-lg bg-indigo-50 p-2.5'>
                  <CircleDollarSign size={20} className='text-primary' />
                </div>
              </div>

              <p className='mt-5 text-3xl font-bold tracking-tight'>
                ৳{details.price.toLocaleString()}
              </p>

              <p className='mt-2 text-xs text-muted-foreground'>
                Per {details.unit}
              </p>
            </div>

            <div className='rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md'>
              <div className='flex items-center justify-between gap-3'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Cost Price
                </p>

                <div className='rounded-lg bg-sky-50 p-2.5'>
                  <Package size={20} className='text-sky-600' />
                </div>
              </div>

              <p className='mt-5 text-3xl font-bold tracking-tight'>
                ৳{details.costPrice.toLocaleString()}
              </p>

              <p className='mt-2 text-xs text-muted-foreground'>
                Purchase cost per {details.unit}
              </p>
            </div>
          </div>

          {/* Profit Card */}
          <div className='rounded-xl border  bg-card  p-5 shadow-sm sm:p-6'>
            <div className='flex items-center justify-between gap-4'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  Estimated Profit Per Unit
                </p>

                <p
                  className={`mt-3 text-3xl font-bold ${
                    profit >= 0 ? 'font-bold tracking-tight' : 'text-red-600'
                  }`}
                >
                  ৳{profit.toLocaleString()}
                </p>

                <p className='mt-2 text-sm text-muted-foreground'>
                  {profitMargin}% profit margin
                </p>
              </div>

              <div className='rounded-xl bg-emerald-100 p-4'>
                <TrendingUp size={28} className='text-emerald-700' />
              </div>
            </div>
          </div>

          {/* Inventory Card */}
          <div className='rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6'>
            <div className='flex items-center justify-between gap-3'>
              <div className='flex items-center gap-3'>
                <div className='rounded-xl bg-violet-50 p-3'>
                  <Box size={21} className='text-violet-600' />
                </div>

                <div>
                  <h3 className='font-semibold'>Inventory Overview</h3>
                  <p className='mt-1 text-xs text-muted-foreground'>
                    Current stock availability
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isLowStock
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {isLowStock ? 'Low Stock' : 'In Stock'}
              </span>
            </div>

            <div className='mt-6 flex items-end justify-between gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>
                  Available Quantity
                </p>

                <p className='mt-2 text-3xl font-bold'>
                  {details.stock}
                  <span className='ml-2 text-base font-normal text-muted-foreground'>
                    {details.unit}
                  </span>
                </p>
              </div>

              <p className='text-right text-sm text-muted-foreground'>
                Low stock threshold
                <span className='mt-1 block font-semibold text-muted-foreground'>
                  {details.lowStockThreshold} {details.unit}
                </span>
              </p>
            </div>

            <div className='mt-5 h-2 overflow-hidden rounded-full bg-muted'>
              <div
                className={`h-full rounded-full transition-all ${
                  isLowStock ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{
                  width: `${
                    details.stock + details.lowStockThreshold > 0
                      ? Math.min(
                          100,
                          (details.stock /
                            (details.stock + details.lowStockThreshold)) *
                            100
                        )
                      : 0
                  }%`,
                }}
              />
            </div>

            <div className='mt-3 flex justify-between text-xs text-muted-foreground'>
              <span>Stock level</span>
              <span>
                {details.stock} / {details.stock + details.lowStockThreshold}
              </span>
            </div>

            {isLowStock && (
              <p className='mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800'>
                Stock is running low. Consider restocking this product.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className='rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7'>
        <div className='mb-6 flex items-center gap-3'>
          <div className='rounded-xl bg-indigo-50 p-3'>
            <Package size={21} className='text-primary' />
          </div>

          <div>
            <h3 className='font-semibold'>Product Information</h3>
            <p className='mt-1 text-sm text-muted-foreground'>
              Detailed product specifications
            </p>
          </div>
        </div>

        <div className='grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3'>
          <InfoItem label='Product Name' value={details.name} />
          <InfoItem label='Product Slug' value={details.slug} />
          <InfoItem label='SKU' value={details.sku} />
          <InfoItem label='Category' value={details.category} />
          <InfoItem label='Unit' value={details.unit} />
          <InfoItem label='Product Status' value={details.status} />

          <InfoItem
            label='Selling Price'
            value={`৳${details.price.toLocaleString()}`}
          />

          <InfoItem
            label='Cost Price'
            value={`৳${details.costPrice.toLocaleString()}`}
          />

          <InfoItem
            label='Profit Per Unit'
            value={`৳${profit.toLocaleString()}`}
          />

          <InfoItem
            label='Current Stock'
            value={`${details.stock} ${details.unit}`}
          />

          <InfoItem
            label='Low Stock Threshold'
            value={`${details.lowStockThreshold} ${details.unit}`}
          />

          <InfoItem label='Product ID' value={details._id} />
        </div>
      </div>
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className='border-b border-border py-4'>
      <p className='mb-2 text-xs font-medium text-muted-foreground'>{label}</p>

      <p className='break-all text-sm font-medium text-foreground'>
        {value || '—'}
      </p>
    </div>
  )
}

export default ProductDetails
