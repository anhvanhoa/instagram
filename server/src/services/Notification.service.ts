import { PopulateOption } from 'mongoose'
import { HttpStatus } from '~/http-status.enum'
import NotificationModel from '~/models/Notification.model'
import PostsModel from '~/models/Post.model'
import UserModel from '~/models/User.model'
import { NotificationEmit } from '~/types'
import { httpResponse } from '~/utils/HandleRes'

export class Notification {
    async getNotify(userName: string) {
        const user = await UserModel.findOne({ userName })
        if (!user) throw httpResponse(HttpStatus.UNAUTHORIZED, { msg: 'Unauthorized' })
        const twentyFourHoursAgo = new Date()
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)
        const notifications = await NotificationModel.find({
            toUser: user._id,
            createdAt: { $gte: twentyFourHoursAgo },
        })
            .populate<PopulateOption>([
                {
                    path: 'fromUser',
                    model: 'user',
                },
                {
                    path: 'toUser',
                    model: 'user',
                },
            ])
            .sort({
                createdAt: 'desc',
            })
        return httpResponse(HttpStatus.OK, notifications)
    }
    async notification(data: NotificationEmit, content: string) {
        const user = await UserModel.findById(data.fromUser)
        if (!user) return 'User not'
        const posts = await PostsModel.findById(data.idPosts)
        if (!posts) return 'Posts not'
        content = `${content} ${posts.title}`
        const notify = await NotificationModel.create({
            fromUser: data.fromUser,
            toUser: data.toUser,
            content,
            idPosts: posts._id,
        })
        return notify
    }
}
const notificationProvider = new Notification()
export default notificationProvider
