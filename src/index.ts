import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import mongoose from 'mongoose'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import { currentUserRouter } from './routes/current-user'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { signInRouter } from './routes/singin'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({
  signed: true,
  // secure: true,
  keys: [''],
}))

app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

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

