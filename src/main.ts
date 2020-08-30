import bodyParser from 'body-parser'
import Server from './server/server'
import express from 'express'
import userRoutes from './api/user.route'
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

//routes
server.app.use('/api/user', userRoutes)

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
