import express from 'express'
const router = express.Router()

router.get('/api/users/signout', (_req, res) => {
  res.send('SignOut')
})

export { router as signOutRouter }
