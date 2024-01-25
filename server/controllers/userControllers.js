import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import {v2 as cloudinary} from 'cloudinary';


export const userControllers = {
  register: async (req, res) => {
    try {
      const data = req.body
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const img = await cloudinary.uploader.upload(dataURI, { public_id: "hlqsdk9h" }, 
      );
      
      const newPass = await bcrypt.hash(data.password, 10)
    
      await User.create({...data, password: newPass, profile_pic: img.url})
      return res.status(201).json({
        message: "Successfully Created"
      })
    } catch (error) {
      console.log(' Error in register API')
       return res.status(400).json({
        message: error.message
      })
    }
  }
}