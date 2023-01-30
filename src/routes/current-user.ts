import express from 'express'
import { currentUser } from '../middlewares/current-user'

const router = express.Router()

router.get('/api/users/currentuser', currentUser, (req, res) => {
  return res.json({ currentUser: req.currentUser || null })

  // if (!req.session?.jwt) {
  //   return res.json({ currentUser: null })
  // }
  //
  // try {
  //   const payload = jwt.verify(req.session.jwt, 'abc')
  //   return res.json({ currentUser: payload })
  // } catch (error) {
  //   return res.json({ currentUser: null })
  // }

})

export { router as currentUserRouter }
