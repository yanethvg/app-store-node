import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { SEED } from '../config/webtoken.config'

export const requireSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const header = <string>req.get('Authorization')
  const token = header?.replace(/^Bearer\s/, '')
  let jwtPayload
  try {
    jwtPayload = <any>await verify(token, SEED)
    req.auth = jwtPayload?.user
    next()
  } catch (err) {
    res.status(401).json({
      err: 'Unauthorized'
    })
    next(err)
  }
}

export const hasAuthorization = (req: Request, res: Response, next: NextFunction): void => {
  const sameUser: boolean = req.currentUser && req.auth && req.currentUser.id === req.auth.id
  const adminUser: boolean = req.currentUser && req.auth && req.auth.role === 'admin'
  const authorized: boolean = sameUser || adminUser

  if (!authorized) {
    res.status(403).json({
      error: 'User is not authorized to perform this action'
    })
  }
  next()
}
