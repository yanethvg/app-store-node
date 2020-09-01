import { Request, Response } from 'express'
import { User } from '../models/User'
import { getRepository } from 'typeorm'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const take = Number(req.query.take) || 2
    const currentPage = Number(req.query.page) || 1
    const skip = (currentPage - 1) * take
    const userRepository = getRepository(User)
    const [users, total] = await userRepository.findAndCount({
      take: take,
      skip: skip,
      select: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
      order: {
        id: 'DESC'
      }
    })
    res.json({ users, count: total })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

export const getUser = (req: Request, res: Response): void => {
  res.json(req.currentUser)
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = getRepository(User)
    const user = await userRepository.findOneOrFail(req.currentUser.id)
    userRepository.merge(user, req.body)
    await userRepository.save(user)
    res.json({ message: 'Updated successfully' })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = getRepository(User)
    await userRepository.delete(req.currentUser.id)
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}
