import * as dotenv from 'dotenv'
dotenv.config()

export const PORT = Number(process.env.PORT) || 4000
