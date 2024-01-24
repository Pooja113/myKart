import mongoose from 'mongoose'

const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/myKartdb');
    console.log('connected to db')
    return
  } catch (error) {
    console.log('Error connecting to the db')
  }
}

export default connectDatabase