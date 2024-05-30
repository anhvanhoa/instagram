import express from 'express'
import PostsController from '~/controllers/Post.controller'
import { accuracy } from '~/middlewares/Token.middleware'
const postsRoute = express.Router()

postsRoute.get('', accuracy, PostsController.posts)
postsRoute.get('/:username/user', accuracy, PostsController.postsUser)
postsRoute.delete('/delete/:id', accuracy, PostsController.deletePosts)
postsRoute.patch('/edit', accuracy, PostsController.editPosts)
postsRoute.post('/like', accuracy, PostsController.like)
postsRoute.patch('/dislike', accuracy, PostsController.dislike)
postsRoute.post('/:id/comment', accuracy, PostsController.comment)
postsRoute.post('/:id/comment-disable', accuracy, PostsController.commentDisablePost)
postsRoute.delete('/:id/comment', accuracy, PostsController.deleteComment)
postsRoute.get('/:id/comment-children', accuracy, PostsController.commentChildren)
postsRoute.post('/upload', accuracy, PostsController.upload)
postsRoute.get('/suggests', accuracy, PostsController.suggests)
postsRoute.get('/:id/likes', accuracy, PostsController.usersLikePost)
postsRoute.post('/:id/like-comment', accuracy, PostsController.likeComment)
postsRoute.post('/:id/dislike-comment', accuracy, PostsController.dislikeComment)
postsRoute.get('/:id', accuracy, PostsController.getPost)

export default postsRoute
