import express from 'express'
import Routers from './routers'
import connectDataBase from './config/database'
import cors from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import dbRedis from './config/dbRedis'
import cookieParser from 'cookie-parser'
configDotenv({ path: '.env' })
const app = express()
const port = 8008
app.use(
    cors({
        origin: process.env.URL_CLIENT,
        credentials: true,
    }),
)
app.use(express.json())
app.use(morgan('tiny'))
app.use(cookieParser())
Routers(app)
connectDataBase()
dbRedis()
const bootstrap = () => console.log(`server running port ${port}`)
app.listen(port, bootstrap)
