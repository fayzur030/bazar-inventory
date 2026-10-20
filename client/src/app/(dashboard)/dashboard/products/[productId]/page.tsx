import ProductDetails from '@/components/products/ProductDetails'
import { productDetails } from '@/services/productDetailServic'
interface ProductDetailsProps {
  params: Promise<{
    productId: string
  }>
}

const ProductDetailsPage = async ({ params }: ProductDetailsProps) => {
  const { productId } = await params
  const details = await productDetails(productId)
  return (
    <div>
      <ProductDetails details={details} />
    </div>
  )
}

export default ProductDetailsPage
