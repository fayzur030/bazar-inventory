import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/nav-items'

export default function Home() {
  const shortcuts = NAV_ITEMS.filter((item) => item.href !== '/')

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight text-[#1F2937]'>
          Dashboard
        </h1>
        <p className='mt-1 text-sm text-[#6B7280]'>
          Welcome to Bazar Inventory. Choose a section to get started.
        </p>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {shortcuts.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className='flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white p-4 hover:bg-gray-50'
            >
              <span className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#DCFCE7] text-[#15803D]'>
                <Icon className='size-5' aria-hidden='true' />
              </span>
              <span className='text-sm font-medium text-[#1F2937]'>
                {item.title}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
