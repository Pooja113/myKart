import express from 'express'
import { userControllers } from '../controllers/userControllers.js';

const route = express.Router();

route.post('/register', userControllers.register)

export default route