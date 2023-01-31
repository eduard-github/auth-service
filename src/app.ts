import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'
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

export { app }
