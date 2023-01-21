import 'dotenv/config';
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import postsRouter from './routes/PostRoutes';
import usersRouter from './routes/UserRoutes';
import authRouter from './routes/AuthRoutes';

const app = express();

app.use(cors());
app.use(json())
app.use(logger('dev'));
app.use(cookieParser());

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
