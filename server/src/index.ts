import express from 'express'
import Routers, { ioEvent } from './routers'
import connectDataBase from './config/database'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import dbRedis from './config/dbRedis'
import cookieParser from 'cookie-parser'
import { join } from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
} from './types'
configDotenv({ path: '.env' })
const app = express()
const port = 8008
const httpServer = createServer(app)
const configCors: CorsOptions = {
    credentials: true,
    origin: process.env.URL_CLIENT,
}
app.use(cors(configCors))
const io = new Server<
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData
>(httpServer, { cors: configCors })
ioEvent(io)

app.use(express.static(join(__dirname, '../public')))
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
Routers(app)
connectDataBase()
dbRedis()
const bootstrap = () => console.log(`server running port ${port}`)
httpServer.listen(port, bootstrap)
