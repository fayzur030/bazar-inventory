import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import AddedProductButton from './AddedProductButton'
import { getALlProducts } from '@/services/getProductService'
import Image from 'next/image'
import ActionButton from './ActionButton'

const ProductsTable = async () => {
  const products = await getALlProducts()

  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white/80">
            All Products: {products.length}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your products, stock and pricing
          </p>
        </div>

        <AddedProductButton />
      </div>

      <Table className="mt-9">
        <TableHeader className='bg-gray-200 dark:bg-gray-600'>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length > 0 ? (
            products.map((product, idx) => (
              <TableRow key={product._id}>
                <TableCell>{idx + 1}</TableCell>

                <TableCell>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                </TableCell>

                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>৳{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.status}</TableCell>

                <TableCell className="text-right">
                  <ActionButton />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="py-8 text-center">
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductsTable