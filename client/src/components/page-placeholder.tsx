import { PackageSearch } from 'lucide-react'

export function PagePlaceholder({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 sm:p-6'>
      <div>
        <h1 className='text-xl font-semibold tracking-tight'>{title}</h1>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <div className='flex flex-1 flex-col items-center justify-center gap-3 rounded-xl bg-muted/50 p-12 text-center'>
        <div className='flex size-12 items-center justify-center rounded-xl bg-background text-muted-foreground shadow-sm'>
          <PackageSearch className='size-6' />
        </div>
        <p className='text-sm font-medium'>{title} coming soon</p>
        <p className='max-w-sm text-xs text-muted-foreground'>
          This section is under construction. The sidebar link is ready — content
          will be added here next.
        </p>
      </div>
    </div>
  )
}
