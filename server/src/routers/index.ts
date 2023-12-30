import { Express } from 'express'
import authRoute from './authRoute'
import userRoute from './userRoute'
import postsRoute from './postsRoute'
function Routers(app: Express) {
    app.use('/api/auth', authRoute)
    app.use('/api/user', userRoute)
    app.use('/api/posts', postsRoute)
}

export default Routers
