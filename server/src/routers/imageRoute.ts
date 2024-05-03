import express from 'express'
import ImageController from '~/controllers/Image.controller'
// import { accuracy } from '~/middlewares/Token.middleware'
import saveImage from '~/middlewares/saveImage.middleware'
const imageRoute = express.Router()

imageRoute.post('/upload', saveImage, ImageController.uploadImage)

export default imageRoute
