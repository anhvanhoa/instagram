import express from 'express'
import UserController from '~/controllers/User.controller'
import { accuracy } from '~/middlewares/Token.middleware'
const userRoute = express.Router()

userRoute.get('/search', accuracy, UserController.search)
userRoute.patch('/update', accuracy, UserController.userUpdate)
userRoute.get('/suggest', accuracy, UserController.suggest)
userRoute.get('/profile', accuracy, UserController.profile)
userRoute.get('/:username', accuracy, UserController.user)
userRoute.post('/follow', accuracy, UserController.follow)
userRoute.post('/unfollow', accuracy, UserController.unfollow)
userRoute.get('/:username/info', accuracy, UserController.info)

export default userRoute
