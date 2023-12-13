import express from 'express'
import Routers from './routers'
import connectDataBase from './config/database'
import cors from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import dbRedis from './config/dbRedis'
import cookieParser from 'cookie-parser'
// import passport from 'passport'
// import FacebookStrategy from 'passport-facebook'
// import session from 'express-session'
// import { UserFacebook } from './types'
configDotenv({ path: '.env' })
const app = express()
const port = 8008
// not use
// app.use(
//     session({
//         secret: process.env.SECRET_SESSION || '',
//         resave: true,
//         saveUninitialized: true,
//     }),
// )
// app.use(passport.initialize())
// app.use(passport.session())
// passport.use(
//     new FacebookStrategy.Strategy(
//         {
//             clientID: process.env.CLIENT_ID || '',
//             clientSecret: process.env.CLIENT_SECRET || '',
//             callbackURL: '/api/auth/facebook/callback',
//             profileFields: ['id', 'displayName', 'photos', 'email'],
//             enableProof: true,
//         },
//         async (accessToken, _, profile, done) => done(null, { ...profile, accessToken }),
//     ),
// )
// passport.serializeUser((user, done) => done(null, user))
// passport.deserializeUser<UserFacebook>((obj, done) => done(null, obj))

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
