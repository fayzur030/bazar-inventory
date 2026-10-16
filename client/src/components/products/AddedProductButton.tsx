import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

const AddedProductButton = () => {
  return (
    <div>
      <Button variant={'custom'}>
        <Plus /> Add Product
      </Button>
    </div>
  )
}

export default AddedProductButton
