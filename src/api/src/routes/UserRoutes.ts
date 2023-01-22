import { Router } from "express";

import * as userController from "../controllers/UserController";
import * as authMiddleware from '../middleware/authMiddleware';

const usersRouter = Router();

usersRouter.get('/', authMiddleware.authenticate, userController.getAllUsers);
usersRouter.get('/:id', authMiddleware.authenticate, userController.getUserById);
usersRouter.post('/', authMiddleware.authenticate, userController.createUser);
usersRouter.delete('/:id', authMiddleware.authenticate, userController.deleteUser);

export default usersRouter;