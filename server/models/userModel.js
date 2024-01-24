import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_pic: { type: String },
  role: { type: String, default: 'customer'},
  isVerified: { type: Boolean, default: false }
},
  {
    timestamps: true
  }
)

const userModel = mongoose.model('Users', userSchema)
export default userModel

