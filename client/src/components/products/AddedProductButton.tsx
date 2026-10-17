import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const AddedProductButton = () => {
  return (
    <Button
      type='primary'
      icon={<PlusOutlined />}
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
