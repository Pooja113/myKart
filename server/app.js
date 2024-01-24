import express from 'express'
import dotenv from 'dotenv'
import bodyparser from 'body-parser'
import connectDatabase from './db.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
dotenv.config()

connectDatabase();

// app.use('/', (req,res) => {
//   res.json({
//     message: "Hello World!!"
//   })
// })

app.use(bodyparser.json())

app.use('/user', userRoutes )

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`)
})