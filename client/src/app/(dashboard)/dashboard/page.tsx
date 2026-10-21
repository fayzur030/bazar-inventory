import OverviewCard from '@/components/dashboard/OverviewCard'
import { getAllProducts } from '@/services/getAllProducts'

export default async function DashboardPage() {
  const products = await getAllProducts()
  return (
    <div>
      <OverviewCard products={products} />
    </div>
  )
}
