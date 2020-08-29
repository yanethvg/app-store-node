import bodyParser from 'body-parser'
import Server from './server/server'
import router from './router/router'
import { PORT } from './config/server.config'
import { connectDB } from './database'

const server = Server.init(PORT)

connectDB()
  .then(() => console.log('conection database'))
  .catch((err) => console.log(err))

//midleware
server.app.use(bodyParser.json())
server.app.use(bodyParser.urlencoded({ extended: true }))

server.app.use(router)

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
