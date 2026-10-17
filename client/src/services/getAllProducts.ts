import { Product } from "@/types/ProductTypes"


export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`https://bazar-inventory.onrender.com/products`)
    if (!res.ok) {
      throw new Error('Fetch to failed products')
    }
    const products = await res.json()
    return products
  } catch (error) {
    console.log(error)
  }
  return []
}
