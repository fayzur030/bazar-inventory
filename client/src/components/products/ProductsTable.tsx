
import { getAllProducts } from '@/services/getAllProducts'
import ProductsTableClient from './ProductsTableClient'


const ProductsTable = async () => {
  const products = await getAllProducts()

  return <ProductsTableClient products={products} />
}

export default ProductsTable
