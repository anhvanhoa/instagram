import express from 'express'
import PostsController from '~/controllers/Posts.controller'
import { accuracy } from '~/middlewares/Token.middleware'
const postsRoute = express.Router()

postsRoute.get('', accuracy, PostsController.posts)
postsRoute.delete('/delete/:id', accuracy, PostsController.deletePosts)
postsRoute.patch('/edit', accuracy, PostsController.editPosts)
postsRoute.post('/like', accuracy, PostsController.like)
postsRoute.patch('/dislike', accuracy, PostsController.dislike)
postsRoute.post('/comment', accuracy, PostsController.comment)
postsRoute.delete('/comment', accuracy, PostsController.deleteComment)
postsRoute.post('/upload', accuracy, PostsController.upload)
postsRoute.get('/suggests', accuracy, PostsController.suggests)
postsRoute.get('/:id', accuracy, PostsController.getOnePosts)

export default postsRoute
