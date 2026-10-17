import { Button } from 'antd'
import { Plus } from 'lucide-react'

const AddedProductButton = () => {
  return (
    <Button
      type='primary'
      icon={<Plus size={16} />}
      style={{
        background: 'linear-gradient(135deg, #4f46e5, #2563eb)',
        border: 'none',
        borderRadius: 10,
      }}
    >
      Add Product
    </Button>
  )
}

export default AddedProductButton
