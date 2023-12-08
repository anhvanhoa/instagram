import express from 'express'
import Routers from './routers'
import connectDataBase from './config/database'
import cors from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import dbRedis from './config/dbRedis'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import FacebookStrategy from 'passport-facebook'
configDotenv({ path: '.env' })
const app = express()
const port = 8008
app.use(
    cors({
        origin: 'http://localhost:3000',
    }),
)
app.use(cookieParser())
app.use(express.json())
app.use(morgan('tiny'))
Routers(app)
connectDataBase()
dbRedis()
app.use(passport.initialize())
passport.use(
    new FacebookStrategy.Strategy(
        {
            clientID: '394039023190899',
            clientSecret: 'ee66d9c9207bbad09b7e5912b43c23f1',
            callbackURL: '/api/auth/facebook/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(123)
            console.log({ accessToken, refreshToken })
            return done(null, profile)
        },
    ),
)
const bootstrap = () => console.log(`server running port ${port}`)
app.listen(port, bootstrap)
