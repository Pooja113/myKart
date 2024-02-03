import express from 'express'
import dotenv from 'dotenv'
import bodyparser from 'body-parser'
import connectDatabase from './db.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'

import {v2 as cloudinary} from 'cloudinary';
          

const app = express()
dotenv.config()

connectDatabase();

// app.use('/', (req,res) => {
//   res.json({
//     message: "Hello World!!"
//   })
// })
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
})

app.use(bodyparser.json())

app.use('/user', userRoutes)
app.use('/product', productRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`)
})