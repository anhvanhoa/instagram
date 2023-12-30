import express from 'express'
import PostsController from '~/controllers/Posts.controller'
import { accuracy } from '~/middlewares/Token.middleware'
const postsRoute = express.Router()

postsRoute.get('', accuracy, PostsController.posts)
postsRoute.post('/upload', accuracy, PostsController.upload)

export default postsRoute
