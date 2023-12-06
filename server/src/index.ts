import express from 'express';
import Routers from './routers';
import connectDataBase from './config/database';
import cors from 'cors';
import morgan from 'morgan';
import { configDotenv } from 'dotenv';
configDotenv({ path: '.env' });
const app = express();
const port = 8008;
app.use(
    cors({
        origin: '*',
    }),
);
app.use(express.json());
app.use(morgan('tiny'));
Routers(app);
connectDataBase();
const bootstrap = () => console.log(`server running port ${port}`);
app.listen(port, bootstrap);
