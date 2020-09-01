import bodyParser from 'body-parser'
import Server from './server/server'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.route'
import userRoutes from './routes/user.route'
import categoryRoutes from './routes/category.route'
import applicationRoutes from './routes/application.route'
import { PORT } from './config/server.config'
import { connectDB } from './database'

const server = Server.init(PORT)

connectDB()
  .then(() => console.log('conection database'))
  .catch((err) => console.log(err))

//midleware
server.app.use(express.json())
server.app.use(bodyParser.json())
server.app.use(bodyParser.urlencoded({ extended: true }))
server.app.use(cors())

//routes
server.app.use('/api/auth', authRoutes)
server.app.use('/api/users', userRoutes)
server.app.use('/api/categories', categoryRoutes)
server.app.use('/api/applications', applicationRoutes)

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
