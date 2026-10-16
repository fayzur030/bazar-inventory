import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Package,
  PackageCheck,
  Receipt,
  Settings,
  Tags,
  Truck,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Products", href: "/products", icon: Package },
  { title: "Categories", href: "/categories", icon: Tags },
  { title: "Inventory", href: "/inventory", icon: Warehouse },
  { title: "Stock Management", href: "/stock", icon: PackageCheck },
  { title: "Suppliers", href: "/suppliers", icon: Truck },
  { title: "Customers", href: "/customers", icon: Users },
  { title: "Orders", href: "/orders", icon: ClipboardList },
  { title: "Sales", href: "/sales", icon: Receipt },
  { title: "Reports", href: "/reports", icon: BarChart3 },
  { title: "Settings", href: "/settings", icon: Settings },
];
