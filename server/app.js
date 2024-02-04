import express from 'express'
import dotenv from 'dotenv'
import bodyparser from 'body-parser'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { v2 as cloudinary } from 'cloudinary';
import connectDatabase from './db.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'

          
const app = express()
dotenv.config()

connectDatabase();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
})

app.use(bodyparser.json())
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsPath = join(__dirname, 'uploads');

app.use("/uploads", express.static(uploadsPath));

app.use('/user', userRoutes)
app.use('/product', productRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`)
})