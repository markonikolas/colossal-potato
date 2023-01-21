import { Router } from 'express';

import * as authController from '../controllers/AuthController';

const authRouter = Router();

authRouter.post('/signin', authController.signin);
authRouter.post('/signout', authController.signout);
authRouter.post('/signup', authController.signup);
authRouter.post('/refresh', authController.refresh);

export default authRouter;