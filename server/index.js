import 'dotenv/config'
import { MongoClient, ObjectId } from 'mongodb'
import express from 'express'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())

const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xvyrvpb.mongodb.net/`
)

export async function connectToMongoDB() {
  try {
    await client.connect()
    console.log('You successfully connected to MongoDB!')
    return client
  } catch (err) {
    console.dir(err)
  }
}

const connectedClient = await connectToMongoDB()
const db = connectedClient.db('bazar-inventory')
const products = db.collection('products')

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bazar & Inventory Management API is running successfully!',
  })
})

//all products
app.get('/products', async (req, res) => {
  const cursor = products.find({})
  const allProducts = await cursor.toArray()
  res.send(allProducts)
})

// Add a new product
app.post('/products', async (req, res) => {
  try {
    const newProduct = req.body

    const result = await products.insertOne(newProduct)

    res.status(201).json({
      success: true,
      message: 'Product added successfully!',
      insertedId: result.insertedId,
    })
  } catch (error) {
    console.error('Failed to add product:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to add product',
    })
  }
})

//getProductById

app.get(`/products/:id`, async (req, res) => {
  const id = req.params
  const query = { _id: new ObjectId(id) }
  const result = await products.findOne(query)
  res.send(result)
})

// delete product
app.delete(`/products/:id`, async (req, res) => {
  const id = req.params
  const query = { _id: new ObjectId(id) }
  const result = await products.deleteOne(query)
  res.send(result)
})

//update product
app.patch(`/products/:id`, async (req, res) => {
  const id = req.params
  const updateProduct = req.body
  const filter = { _id: new ObjectId(id) }
  const options = { upsert: true }
  const updateDoc = {
    $set: {
      name: updateProduct.name,
      category: updateProduct.category,
      description: updateProduct.description,
      image: updateProduct.image,
      price: updateProduct.price,
      costPrice: updateProduct.costPrice,
      stock: updateProduct.stock,
      unit: updateProduct.unit,
      sku: updateProduct.sku,
      status: updateProduct.status,
      lowStockThreshold: updateProduct.lowStockThreshold,
    },
  }
  const result = await products.updateOne(filter, updateDoc, options)
  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
