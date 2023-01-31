import mongoose from 'mongoose'
import { app } from './app';

const start = async () => {
  // if (!process.env.JWT_KEY) {
  //   throw new Error('JWT must be defined')
  // }
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect("mongodb://root:123456@mongo:27017");
    console.log('Connected to MongoDB ---- ')
  } catch (error) {
    console.log('ERR ---- ', error)
  }
  app.listen(5000, () => {
    console.log('Server listening on port 5000')
  })
}

start()

