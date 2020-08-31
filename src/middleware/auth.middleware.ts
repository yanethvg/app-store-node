import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { SEED } from '../config/webtoken.config'

export const requireSignin = (req: Request, res: Response, next: NextFunction): void => {
  const header = <string>req.get('Authorization')
  const token = header?.replace(/^Bearer\s/, '')
  console.log(token)
  let jwtPayload
  try {
    jwtPayload = <any>verify(token, SEED)
  } catch (err) {
    res.status(401).json({
      err: 'Unauthorized'
    })
  }
  req.auth = jwtPayload.user
  next()
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
