import express from 'express'
import { productControllers } from '../controllers/productControllers.js'
import verify from '../middleware/verify.js'
import { upload } from '../utils/multerStorage.js'
const route = express.Router()

route.post('/create', verify, upload.array('productPics'), productControllers.createProduct)
route.delete('/delete/:productId', verify, productControllers.deleteProduct)

export default route