import express from 'express'
import { userControllers } from '../controllers/userControllers.js';
import verify from '../middleware/verify.js';
import { upload } from '../utils/multerStorage.js';
const route = express.Router();

route.post('/register', upload.single('profile'), userControllers.register)
route.get('/verify/:token', userControllers.tokenVerification)
route.post('/login',  userControllers.login)
route.get('/reset/password', userControllers.resetPassword)
route.post('/forgot/password', userControllers.forgotPassword)
route.post('/change/password/:token', userControllers.changePassword)
route.put('/edit/profile',verify, upload.single('profile'), userControllers.editProfile)
route.delete('/delete/profile', verify, userControllers.deleteProfile)



export default route