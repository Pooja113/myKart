import express from 'express'
import multer from 'multer'
import { userControllers } from '../controllers/userControllers.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const route = express.Router();

route.post('/register', upload.single('profile'), userControllers.register)

export default route