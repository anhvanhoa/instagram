import { Express } from 'express';
import authRoute from './authRoute';
function Routers(app: Express) {
    app.use('/api/auth', authRoute);
}

export default Routers;
