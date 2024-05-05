import express from 'express'
import Routers, { ioEvent } from './routers'
import connectDataBase from './config/database'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import envConfig from './config/env'
import cookieParser from 'cookie-parser'
import { join } from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'
import '~/config/cloudinary'
import '~/config/logger'
import {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
} from '~/types/socket'
import { UserNoPassword } from './types/user'

const app = express()
const port = 8008
const httpServer = createServer(app)
const configCors: CorsOptions = {
    credentials: true,
    origin: [envConfig.URL_CLIENT],
}
const io = new Server<
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    UserNoPassword
>(httpServer, { cors: configCors })
//
ioEvent(io)
app.use(express.static(join(__dirname, '../public')))
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(configCors))
Routers(app)
const bootstrap = async () => {
    await connectDataBase()
    console.log(`server running port ${port}`)
}
httpServer.listen(port, bootstrap)
