import express from 'express'
import UserController from '~/controllers/User.controller'
import { accuracy } from '~/middlewares/Token.middleware'
const userRoute = express.Router()

userRoute.get('/search', accuracy, UserController.search)
userRoute.get('/:username', accuracy, UserController.user)
userRoute.post('/follow', accuracy, UserController.follow)
userRoute.post('/unfollow', accuracy, UserController.unfollow)

export default userRoute
