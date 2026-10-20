import { Product } from '@/types/ProductTypes'

export const productDetails = async (productId: string): Promise<Product> => {
  const res = await fetch(`https://bazar-inventory.onrender.com/products/${productId}`)
  if (!res.ok) {
    throw new Error('Failed to fetch product details')
  }
  const product = await res.json()
  return product
}
