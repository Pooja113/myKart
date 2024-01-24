import bcrypt from 'bcrypt'
import User from '../models/userModel.js'

export const userControllers = {
  register: async (req, res) => {
    try {
      const data = req.body
      const newPass = await bcrypt.hash(data.password, 10)
  
      await User.create({...data, password: newPass})
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