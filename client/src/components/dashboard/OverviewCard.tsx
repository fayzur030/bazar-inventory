import { Product } from '@/types/ProductTypes'
import { Card, CardContent } from '../ui/card'
import {
  Package,
  Boxes,
  CircleDollarSign,
  ArrowUpRight,
  PackageX,
} from 'lucide-react'

interface ProductOverviewProps {
  products: Product[]
}

const OverviewCard = ({ products }: ProductOverviewProps) => {
  const totalProducts = products.length

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0)

  const inventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  )

  const stockOut = products.filter((product) => product.stock === 0).length

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts.toLocaleString(),
      description: 'Products in your inventory',
      icon: Package,
      iconStyle:
        'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
      accent: 'border-t-blue-500',
    },
    {
      title: 'Total Stock',
      value: totalStock.toLocaleString(),
      description: 'Units available in stock',
      icon: Boxes,
      iconStyle:
        'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
      accent: 'border-t-violet-500',
    },
    {
      title: 'Out of Stock',
      value: stockOut.toLocaleString(),
      description: 'Products currently unavailable',
      icon: PackageX,
      iconStyle: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
      accent: 'border-t-red-500',
    },
    {
      title: 'Inventory Value',
      value: `৳${inventoryValue.toLocaleString()}`,
      description: 'Based on selling price',
      icon: CircleDollarSign,
      iconStyle:
        'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
      accent: 'border-t-emerald-500',
    },
  ]

  return (
    <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card
            key={stat.title}
            className={`group relative overflow-hidden rounded-xl border border-t-4 ${stat.accent.replace('border-l-', 'border-t-')} bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900`}
          >
            <CardContent className='p-5'>
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <p className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                    {stat.title}
                  </p>

                  <h3 className='mt-3 wrap-break-word text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white'>
                    {stat.value}
                  </h3>
                </div>

                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${stat.iconStyle}`}
                >
                  <Icon className='size-6' strokeWidth={1.8} />
                </div>
              </div>

              <div className='mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800'>
                <ArrowUpRight className='size-4 shrink-0 text-slate-400' />

                <p className='text-xs text-slate-500 dark:text-slate-400'>
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default OverviewCard
