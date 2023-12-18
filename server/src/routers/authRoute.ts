import express from 'express'
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
authRoute.post('/login-facebook', AuthController.loginFacebook)
// login account
authRoute.post('/login', AuthController.login)
// logout account
authRoute.post('/logout', accuracy, AuthController.logout)
export default authRoute
