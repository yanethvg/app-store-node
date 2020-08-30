import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { SEED, EXPIRATION_TOKEN } from '../config/webtoken.config'
import { User } from '../models/User'

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = getRepository(User)
    const userExists = await userRepository.findOne({ where: { email: req.body.email } })
    if (userExists) {
      res.status(403).json({
        err: 'Email is taken!'
      })
    } else {
      const { email, password, name } = req.body
      const salt = await genSaltSync(10)
      const hashed_password = hashSync(password, salt)

      const userSave = {
        name,
        email,
        password: hashed_password
      }

      const user = await userRepository.create(userSave)
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

export const signin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  try {
    const userRepository = getRepository(User)
    const userDB = await userRepository.findOne({ where: { email } })
    if (!userDB) {
      res.status(401).json({
        err: 'User with that email does not exist. Please signup.'
      })
    } else {
      if (!compareSync(password, userDB.password)) {
        res.status(400).json({
          err: 'User with that email does not exist. Please signup.'
        })
      } else {
        const token: string = sign(
          {
            user: userDB
          },
          SEED,
          { expiresIn: EXPIRATION_TOKEN }
        )
        const userSend = {
          name: userDB.name,
          email: userDB.email,
          role: userDB.role
        }

        res.json({
          user: userSend,
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
