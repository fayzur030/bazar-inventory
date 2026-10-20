import {
  LayoutDashboard,
  Package,
  Tags,
  Warehouse,
  ShoppingCart,
  ShoppingBasket,
  Truck,
  Users,
  ChartNoAxesCombined,
  Wallet,
  Settings,
  LifeBuoy,
  Receipt,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  title: string
  slug: string | null
  icon: LucideIcon
  badge?: string
}

// Overview
export const dashboards: NavItem[] = [
  {
    title: 'Dashboard',
    slug: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Analytics & Reports',
    slug: 'analytics',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'All Products',
    slug: 'products',
    icon: Package,
  },
  {
    title: 'Categories',
    slug: 'categories',
    icon: Tags,
  },
  {
    title: 'Stock Management',
    slug: 'inventory',
    icon: Warehouse,
  },
]

// Inventory Management

// Business Operations
export const modules: NavItem[] = [
  {
    title: 'Sales',
    slug: 'sales',
    icon: ShoppingCart,
  },
  {
    title: 'Purchases',
    slug: 'purchases',
    icon: ShoppingBasket,
  },
  {
    title: 'Suppliers',
    slug: 'suppliers',
    icon: Truck,
  },
  {
    title: 'Customers',
    slug: 'customers',
    icon: Users,
  },
  {
    title: 'Expenses',
    slug: 'expenses',
    icon: Wallet,
  },
  {
    title: 'Transactions',
    slug: 'transactions',
    icon: Receipt,
  },
  {
    title: 'Settings',
    slug: 'settings',
    icon: Settings,
  },
  {
    title: 'Help & Support',
    slug: 'help',
    icon: LifeBuoy,
  },
]

// All navigation items
export const allNav: NavItem[] = [...dashboards, ...modules]
