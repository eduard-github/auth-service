import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import { BadRequestError } from '../errors/bad-request-error'
import { RequestValidationError } from '../errors/request-validation-error'
import { User } from '../models/user'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 and 20 charachters'),
  ],
  async (req: Request, res: Response) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }

    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new BadRequestError('Email in use')
    }

    const user = User.build({ email, password })
    await user.save()

    const userJwt = jwt.sign({ id: user.id, email: user.email }, 'abc')

    req.session = { jwt: userJwt }

    res.status(201).json(user)
  })

export { router as signUpRouter }
