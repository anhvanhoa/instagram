import express from 'express'
import passport from 'passport'
import AuthController from '~/controllers/Auth.controller'
import { verifyOtp, acceptTell } from '~/middlewares/Auth.middleware'
import { accuracy } from '~/middlewares/Token.middleware'

const authRoute = express.Router()
// unique information
authRoute.post('/unique-info', AuthController.isInfo)
// crete otp when register
authRoute.post('/sign-otp', AuthController.signCode)
// register account
authRoute.post('/register', verifyOtp, AuthController.register)
authRoute.post('/firebase-register', acceptTell, AuthController.register)
// register facebook
// authRoute.get('/facebook', passport.authenticate('facebook'))
// authRoute.get(
//     '/facebook/callback',
//     passport.authenticate('facebook', {
//         failureRedirect: '/api/auth/facebook/return',
//         successReturnToOrRedirect: '/api/auth/facebook/return',
//     }),
// )
// authRoute.get('/facebook/return', AuthController.registerFacebook)
authRoute.post('/login-facebook', AuthController.loginFacebook)
// login account
authRoute.post('/login', AuthController.login)
// logout account
authRoute.post('/logout', accuracy, AuthController.logout)
export default authRoute
