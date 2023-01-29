import express from 'express'
const router = express.Router()

router.get('/api/users/currentuser', (_req, res) => {
  res.send('CurrentUser')
})

export { router as currentUserRouter }
