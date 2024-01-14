import express from 'express'
import NotifyController from '~/controllers/Notify.controller'
import { accuracy } from '~/middlewares/Token.middleware'

const notifyRoute = express.Router()
notifyRoute.get('', accuracy, NotifyController.notification)
export default notifyRoute
