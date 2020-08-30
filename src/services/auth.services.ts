import { genSalt, hash, compare } from 'bcrypt'
import { SALT } from '../config/webtoken.config'
import { SEED, EXPIRATION_TOKEN } from '../config/webtoken.config'
import { sign } from 'jsonwebtoken'
import {
  UserInterface,
  UserTokenInterface,
  UserAfterLoginInterface
} from '../interfaces/auth.interface'

export const generateUser = async (user: UserInterface): Promise<UserInterface> => {
  const salt = await genSalt(SALT)
  const hashed_password = await hash(user.password, salt)
  const userSave = { ...user, password: hashed_password }
  return userSave as UserInterface
}

export const validatePassword = async (user: UserInterface, password: string): Promise<boolean> => {
  const isValidate = await compare(password, user.password)
  return isValidate
}

export const generateToken = (user: UserAfterLoginInterface): UserTokenInterface => {
  const userSend = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  } as UserAfterLoginInterface

  const token: string = sign(
    {
      user: userSend
    },
    SEED,
    { expiresIn: EXPIRATION_TOKEN }
  )
  return {
    token,
    user: userSend
  } as UserTokenInterface
}
