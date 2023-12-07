import express from 'express';
import AuthController from '~/controllers/Auth.controller';
import { verifyOtp } from '~/middlewares/Auth.middleware';
const authRoute = express.Router();
// unique information
authRoute.post('/unique-info', AuthController.isInfo);
// crete otp when register
authRoute.post('/sign-otp', AuthController.signCode);
// register account
authRoute.post('/register', verifyOtp, AuthController.register);
authRoute.post('/firebase-register', AuthController.register);
// login account
authRoute.post('/login', AuthController.login);
export default authRoute;
