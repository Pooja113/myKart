import express from 'express'
import multer from 'multer'
import { userControllers } from '../controllers/userControllers.js';
import verify from '../middleware/verify.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const route = express.Router();

route.post('/register', upload.single('profile'), userControllers.register)
route.get('/verify/:token', userControllers.tokenVerification)
route.post('/login',  userControllers.login)
route.get('/reset/password', userControllers.resetPassword)
route.post('/forgot/password', userControllers.forgotPassword)
route.put('/edit/profile',verify, userControllers.editProfile)
route.delete('/delete/profile', userControllers.deleteProfile)



export default route