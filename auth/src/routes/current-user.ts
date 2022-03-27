import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {
  // check existing token
  if (!req.session?.jwt) {
    return res.send({ currentUser: null })
  }

  // decode the token
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
    res.send({ currentUser: payload })
  } catch (err) {
    res.send({ currentUser: null })
  }
})

export { router as currentUserRouter }
