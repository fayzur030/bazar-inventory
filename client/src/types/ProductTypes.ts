export interface Product {
  _id: string
  name: string
  slug: string
  category: string
  description: string
  image: string
  price: number
  costPrice: number
  stock: number
  unit: string
  sku: string
  status: 'active' | 'inactive'
  lowStockThreshold: number
}
