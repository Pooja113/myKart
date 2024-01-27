import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary';
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const userControllers = {
  register: async (req, res) => {
    try {
      const data = req.body
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const img = await cloudinary.uploader.upload(dataURI, { public_id: "hlqsdk9h" });
      
      const newPass = await bcrypt.hash(data.password, 10)
      const user = await User.create({ ...data, password: newPass, profile_pic: img.url })
      const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET_KEY);

      
      const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: { 
            user: process.env.EMAIL_USERNAME, 
            pass: process.env.PASSWORD 
        } 
      })
      const mailConfigurations = { 
          from: process.env.EMAIL_USERNAME, 
          to: user.email, 
          subject: 'Email Verification', 
          text: `Hi! There, You have recently visited  
               our website and entered your email. 
               Please follow the given link to verify your email 
               ${process.env.BASE_URL}/user/verify/${token}  
               Thanks` 
    }; 
 
      const emailSent = transporter.sendMail(mailConfigurations)
      if(emailSent) {
          console.log('Email Sent Successfully'); 
        }
          
      return res.status(201).json({
        message: "Successfully Created",
        token
      })
    } catch (error) {
      console.log(' Error in register API')
       return res.status(400).json({
        message: error.message
      })
    }
  },


  tokenVerification: async (req, res) => {
    try {
      const { token } = req.params
    
      const tokenVerify = jwt.verify(token, process.env.SECRET_KEY)
      if (!tokenVerify) {
        return res.status(400).json({
          message: "Email verification failed, possibly the link is invalid or expired"
        })
      }
      const user = await User.findOneAndUpdate({ email: tokenVerify.email }, { isVerified: true }, { new: true })
      
      if(!user) {
        return res.status(404).json({
          message: "User doen't exist!"
        })
      }
      
      return res.status(200).json({
        message: "Successfully Verified",
      })
    } catch (error) {
      console.log(' Error in verification api')
       return res.status(400).json({
        message: error.message
      })
    }
  },

  login: async (req, res) => {
    try {
      const {email, password} = req.body
      let user = await User.findOne({ email })
      if(!user) {
        return res.status(404).json({
          message: "User doen't exist!"
        })
      }

      const passwardVerify = await bcrypt.compare(password, user.password)

      if (!passwardVerify) {
        return res.status(404).json({
          message: "Wrong Credentials"
        })
      }
      
     let token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET_KEY);

      return res.status(200).json({
        message: "Successfully Logged In!",
        token
      })
    } catch (error) {
      console.log(' Error in Login api')
       return res.status(400).json({
        message: error.message
      })
    }
  },

  resetPassword: async (req, res) => {
    try {
      const {email, oldPassword, newPassword} = req.body
      let user = await User.findOne({ email })
      if(!user) {
        return res.status(404).json({
          message: "User doen't exist!"
        })
      }

      const passwardVerify = await bcrypt.compare(oldPassword, user.password)
      if (!passwardVerify) {
        return res.status(404).json({
          message: "Wrong Password"
        })
      }
      
     const newHashPassword = await bcrypt.hash(newPassword, 10) 
     await User.updateOne({ email: user.email }, { password: newHashPassword })
      return res.status(200).json({
        message: "Successfully changed the password",
      })
    } catch (error) {
      console.log(' Error in reset password api')
       return res.status(400).json({
        message: error.message
      })
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({
          message: "No user found!!"
        })
      }

      const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET_KEY);

      const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: { 
            user: process.env.EMAIL_USERNAME, 
            pass: process.env.PASSWORD 
        } 
      })
      const mailConfigurations = { 
        from: process.env.EMAIL_USERNAME, 
        to: user.email, 
        subject: 'Change the password', 
        text: `Hi! There, You have recently visited  
             our website and entered your email. 
             Please follow the given link to change the password
             ${process.env.BASE_URL}/user/change/password/${token}  
             Thanks` 
        }; 

      const emailSent = transporter.sendMail(mailConfigurations)
        if(emailSent) {
          console.log('Email Sent Successfully'); 
        } else {
          throw Error("Email Sent Failed!")
      }
        
    return res.status(200).json({
      message: "Please check email to change the password!",
    })
    } catch (error) {
      console.log(' Error in forgot password api')
       return res.status(400).json({
        message: error.message
      })
    }
  },

  changePassword: async (req, res) => {
    try {
      const { token } = req.params
      const { newPassword } = req.body
      const tokenVerify =  jwt.verify(token, process.env.SECRET_KEY)
      if (!tokenVerify) {
        return res.status(400).json({
          message: "Email verification failed, possibly the link is invalid or expired"
        })
      }
      const hashedPass = await bcrypt.hash(newPassword, 10)
      const user = await User.findOneAndUpdate({ email: tokenVerify.email }, { password: hashedPass }, { new: true })
      if(!user) {
        return res.status(404).json({
          message: "User doen't exist!",
          user
        })
      }
      
      return res.status(200).json({
        message: "Successfully changed the password!",
      })
    } catch (error) {
      console.log(' Error in verification api')
       return res.status(400).json({
        message: error.message
      })
    }
  },
  editProfile: async (req, res) => {
    try {
      const data = req.body
      if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const img = await cloudinary.uploader.upload(dataURI, { public_id: "hlqsdk9h" });
        data.profile_pic = img.url
      }
      const updatedUser = await User.findOneAndUpdate({ email: req.user.email }, { ...data }, { new: true })
      if (!updatedUser) {
        return res.status(404).json({
          message: "No user found!"
        })
    }
      return res.status(200).json({
        data: updatedUser
      })
      
    } catch (error) {
      console.log('Error in edit profile api')
       return res.status(400).json({
        message: error.message
      })
    }
  },

  deleteProfile: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.user.email })
      if (!user) {
        return res.status(404).json({
          message: "No user found!!"
        })
      }
      await User.deleteOne({email: req.user.email});
      return res.status(200).json({
        message: "Profile deleted Successfully!"
      })

    } catch (error) {
      console.log(' Error in delete api')
       return res.status(400).json({
        message: error.message
      })
    }
  },

}