import express from 'express'
import 'express-async-errors'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import { currentUserRouter } from './routes/current-user'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'
import { signInRouter } from './routes/singin'

const app = express()
app.use(express.json())

app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})
