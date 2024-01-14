import express from 'express'
import PostsController from '~/controllers/Posts.controller'
import { accuracy } from '~/middlewares/Token.middleware'
import saveImage from '~/middlewares/saveImage.middleware'
const imageRoute = express.Router()

imageRoute.post('/upload', saveImage, PostsController.uploadImage)

export default imageRoute
