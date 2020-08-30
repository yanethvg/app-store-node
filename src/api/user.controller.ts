import { Request, Response } from 'express'
import { User } from '../models/User'
import { getRepository } from 'typeorm'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.currentUser)
    const take = Number(req.query.take) || 2
    const currentPage = Number(req.query.page) || 1
    const skip = (currentPage - 1) * take
    const userRepository = getRepository(User)
    const [users, total] = await userRepository.findAndCount({
      take: take,
      skip: skip,
      select: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
    })
    res.json({ users, count: total })
  } catch (err) {
    res.status(500).json({
      err
    })
  }
}

export const getUser = (req: Request, res: Response): void => {
  res.json(req.currentUser)
}
