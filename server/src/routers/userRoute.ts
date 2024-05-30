import express from 'express'
import UserController from '~/controllers/User.controller'
import { accuracy } from '~/middlewares/Token.middleware'
const userRoute = express.Router()

userRoute.get('/search', accuracy, UserController.search)
userRoute.patch('/update', accuracy, UserController.userUpdate)
userRoute.get('/suggest', accuracy, UserController.suggest)
userRoute.get('/profile', accuracy, UserController.profile)
userRoute.post('/follow', accuracy, UserController.follow)
userRoute.post('/block', accuracy, UserController.block)
userRoute.post('/unblock', accuracy, UserController.unblock)
userRoute.post('/unfollow', accuracy, UserController.unfollow)
userRoute.post('/:id/remove-follower', accuracy, UserController.removeFollower)
userRoute.get('/:username/followers', accuracy, UserController.follower)
userRoute.post('/follow/show-many', accuracy, UserController.showManyFollowersOrFollowing)
userRoute.get('/:username/following', accuracy, UserController.following)
userRoute.get('/:username/check', UserController.checkUser)
userRoute.get('/:username', accuracy, UserController.user)

export default userRoute
