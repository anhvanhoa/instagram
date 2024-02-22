import express from 'express'
import Routers, { ioEvent } from './routers'
import connectDataBase from './config/database'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import dbRedis from './config/dbRedis'
import cookieParser from 'cookie-parser'
import path, { join } from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
} from './types'
import fs from 'fs'
configDotenv({ path: '.env.production' }) //.env.local
const app = express()
const port = 8008
const httpServer = createServer(app)
const configCors: CorsOptions = {
    credentials: true,
    origin: process.env.URL_CLIENT,
}
const io = new Server<
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData
>(httpServer, { cors: configCors })
ioEvent(io)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a',
})
app.use(express.static(join(__dirname, '../public')))
app.use(express.json())
app.use(morgan('tiny', { stream: accessLogStream }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(configCors))
Routers(app)
connectDataBase()
// dbRedis()
const bootstrap = () => console.log(`server running port ${port}`)
httpServer.listen(port, bootstrap)
