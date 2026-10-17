import { getALlProducts } from '@/services/getProductService'
import ProductsTable from './ProductsTable'


const ProductFetch = async () => {
  const data = await getALlProducts()

  const products = data.map((product) => ({
    key: product._id,
    image: product.image,
    name: product.name,
    category: product.category,
    unit: product.unit,
    price: product.price,
    stock: product.stock,
    status: product.status,
  }))

  return <ProductsTable products={products} />
}

export default ProductFetch
