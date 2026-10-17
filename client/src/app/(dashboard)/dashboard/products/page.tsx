import ProductsTable from '@/components/products/ProductsTable'
import { Suspense } from 'react'

const ProductPage = () => {
  return (
    <div>
      <Suspense>
        <ProductsTable />
      </Suspense>
    </div>
  )
}

export default ProductPage
