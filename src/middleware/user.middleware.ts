import { Request, Response, NextFunction, RequestParamHandler } from 'express'
import { User } from '../models/User'
import { getRepository } from 'typeorm'

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
  id: RequestParamHandler
): Promise<void> => {
  try {
    const userRepository = getRepository(User)
    const id_user = Number(id)
    const user = await userRepository.findOne(id_user, {
      select: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
    })
    if (!user) {
      res.status(400).json({
        err: 'User not found'
      })
      return
    } else {
      req.currentUser = user
      next()
    }
  } catch (err) {
    next(err)
  }
}
