import express from 'express'
import ChatController from '~/controllers/Chat.controller'
import { accuracy } from '~/middlewares/Token.middleware'

const chatRoute = express.Router()
chatRoute.get('/users', accuracy, ChatController.users)
chatRoute.get('/room/:idUser', accuracy, ChatController.roomChat)
chatRoute.get('/:idRoom', accuracy, ChatController.boxChat)
export default chatRoute
