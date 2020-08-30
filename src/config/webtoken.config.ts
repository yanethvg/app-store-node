import * as dotenv from 'dotenv'
dotenv.config()

export const SEED = String(process.env.SEED) || 'hello'

export const EXPIRATION_TOKEN = String(process.env.EXPIRATION_TOKEN) || '12h'

export const SALT = Number(process.env.SALT) || 10
