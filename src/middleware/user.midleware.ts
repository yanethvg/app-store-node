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
    const user = await userRepository.findOneOrFail(id_user, {
      select: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
    })
    console.log(user)
    req.currentUser = user
    next()
  } catch (err) {
    next(err)
  }
}
