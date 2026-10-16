'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { MoreHorizontalIcon } from 'lucide-react'
import Link from 'next/link'

const ActionButton = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant='ghost' size='icon' className='size-8'>
              <MoreHorizontalIcon />
              <span className='sr-only'>Open menu</span>
            </Button>
          }
        />
        <DropdownMenuContent align='end'>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          {/* <Link href={`users/${pr._id}`}>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </Link> */}

          <DropdownMenuItem>View Details</DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <EditModal user={user} open={open} onOpenChange={setOpen} /> */}
    </div>
  )
}

export default ActionButton
