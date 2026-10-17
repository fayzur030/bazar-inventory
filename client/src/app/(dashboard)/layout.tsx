import { AppLayout } from '@/components/app-layout'
import type { ReactNode } from 'react'

function DashboardLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>
}
export default DashboardLayout
