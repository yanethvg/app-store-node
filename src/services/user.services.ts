import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models/User'

export const signup = async (req: Request, res: Response): Promise<void> => {
  // find the user based on email
  console.log(req.body)
  try {
    const userRepository = getRepository(User)
    const userExists = await userRepository.find({ where: req.body.email })
    if (userExists) {
      res.status(403).json({
        err: 'Email is taken!'
      })
    } else {
      const user = await userRepository.create(req.body)
      await userRepository.save(user)
      res.json({
        message: 'Signup sucess! Please Login'
      })
    }
  } catch (err) {
    res.status(500).json({
      err
    })
  }
}
