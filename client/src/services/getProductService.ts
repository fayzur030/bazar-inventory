import { Product } from '@/types/productsType'
const BASE_URL = 'https://bazar-inventory.onrender.com'

export const getALlProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${BASE_URL}/products`)
    if (!res.ok) {
      throw new Error(' Fetch to failed products ')
    }
    const products = await res.json()
    return products
  } catch (error) {
    console.log(error)
  }
  return []
}
