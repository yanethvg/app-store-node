import { Request, Response, CookieOptions } from 'express'
import { getRepository } from 'typeorm'
import { EXPIRATION_TOKEN } from '../config/webtoken.config'
import { User } from '../models/User'
import { generateUser, validatePassword, generateToken } from '../services/auth.services'

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = getRepository(User)
    const { email } = req.body
    const userExists = await userRepository.findOne({ where: { email } })
    if (userExists) {
      res.status(403).json({
        err: 'Email is taken!'
      })
    } else {
      const user = await generateUser(req.body)

      const userDB = await userRepository.create(user)
      await userRepository.save(userDB)

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

export const signin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  try {
    const userRepository = getRepository(User)
    const userDB = await userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role']
    })
    if (!userDB) {
      res.status(401).json({
        err: 'User with that email does not exist. Please signup.'
      })
    } else {
      if (!(await validatePassword(userDB, password))) {
        res.status(400).json({
          err: 'User with that email does not exist. Please signup.'
        })
      } else {
        const { token, user } = generateToken(userDB)
        res.cookie('t', token, { expire: new Date() + EXPIRATION_TOKEN } as CookieOptions)
        res.json({
          user,
          token
        })
      }
    }
  } catch (err) {
    res.status(500).json({
      err
    })
  }
}

export const signout = (req: Request, res: Response): void => {
  res.clearCookie('t')
  res.json({ message: 'Signout success!' })
}
