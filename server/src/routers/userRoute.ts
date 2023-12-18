import express from 'express'
import UserController from '~/controllers/User.controller'
import { accuracy } from '~/middlewares/Token.middleware'
const userRoute = express.Router()

userRoute.get('/search', accuracy, UserController.search)

export default userRoute
