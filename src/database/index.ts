import { createConnection } from 'typeorm'

export const connectDB = async (): Promise<void> => {
  const connection = await createConnection()
  await connection.synchronize()
}
