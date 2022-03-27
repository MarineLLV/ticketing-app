import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string
  email: string
}

// Modify the type definition to add currentUser property
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

// check if the user is logged and extract the info from the payload
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //check existing token
  if (!req.session?.jwt) {
    return next()
  }

  // decode token
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload
    req.currentUser = payload
  } catch (err) {}

  next()
}
