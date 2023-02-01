import mongoose from 'mongoose'
import { app } from './app';

const PORT = process.env.API_PORT || 5000;
const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || 'root'
const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || '123456'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT must be defined')
  }
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(`mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongo:27017`);
  } catch (error) {
    console.log('ERR ---- ', error)
  }
  app.listen(PORT, () => {
    console.log(`API service listening on port ${PORT}`)
  })
}

start()

