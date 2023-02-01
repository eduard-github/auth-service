import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export function currentUser(req: Request, _res: Response, next: NextFunction) {
  if (!req.session?.jwt) {
    next()
  }

  try {
    const payload = jwt.verify(req.session.jwt, 'abc') as UserPayload
    req.currentUser = payload
  } catch (error) { }

  next()
}
