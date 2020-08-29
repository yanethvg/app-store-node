import * as dotenv from 'dotenv'
dotenv.config()

export const PG_PORT = Number(process.env.PG_PORT) || 5432

export const PG_HOST = process.env.PG_HOST || 'localhost'

export const PG_USER = process.env.PG_USER || 'postgres'

export const PG_PASSWORD = process.env.PG_PASSWORD || '1234'

export const PG_DATABASE = process.env.PG_DATABASE || 'node_pg'
