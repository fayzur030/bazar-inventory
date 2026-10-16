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

//getProductById

app.get(`/products/:id`, async (req, res) => {
  const id = req.params
  const query = { _id: new ObjectId(id) }
  const result = await products.findOne(query)
  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
