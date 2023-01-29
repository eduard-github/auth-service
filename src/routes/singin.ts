import express from 'express'
const router = express.Router()

router.get('/api/users/signin', (_req, res) => {
  res.send('SignIn')
})

export { router as signInRouter }
