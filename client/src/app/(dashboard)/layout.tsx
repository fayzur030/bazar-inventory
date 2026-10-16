import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/side-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main className='ml-4 mt-4'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
