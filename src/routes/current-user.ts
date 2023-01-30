import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/api/users/currentuser', async (req, res) => {
  if (!req.session?.jwt) {
    return res.json({ currentUser: null })
  }

  try {
    const payload = jwt.verify(req.session.jwt, 'abc')
    return res.json({ currentUser: payload })
  } catch (error) {
    return res.json({ currentUser: null })
  }
})

export { router as currentUserRouter }
