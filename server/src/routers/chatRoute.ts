import express from 'express'
import ChatController from '~/controllers/Chat.controller'
import { accuracy } from '~/middlewares/Token.middleware'

const chatRoute = express.Router()
chatRoute.get('/user', accuracy, ChatController.users)
chatRoute.get('/:id', accuracy, ChatController.boxChat)
export default chatRoute
