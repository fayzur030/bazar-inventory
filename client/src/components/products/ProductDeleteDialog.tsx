import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Product } from '@/types/ProductTypes'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface DeleteProps {
  product: Product
  open: boolean
  onOpenChange?: (open: boolean) => void
}

const ProductDeleteDialog = ({ open, onOpenChange, product }: DeleteProps) => {
  const router = useRouter()
  const handleDeleteProduct = async (productId: string) => {
    try {
      const res = await fetch(
        `https://bazar-inventory.onrender.com/products/${productId}`,
        {
          method: 'DELETE',
        }
      )

      if (!res.ok) {
        throw new Error('Failed to delete product')
      }

      toast.success('Product deleted successfully!')
      router.refresh()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteProduct(product._id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ProductDeleteDialog
