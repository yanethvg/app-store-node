import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { SEED } from '../config/webtoken.config'

export const hasAuthorization = (req: Request, res: Response, next: NextFunction): void => {
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
  req.currentUser = jwtPayload.user
  console.log(req.currentUser)
  next()
}
