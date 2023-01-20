import { Router } from 'express';

import * as postController from '../controllers/PostController';
import * as authMiddleware from '../middleware/authMiddleware';

const postsRouter = Router();

postsRouter.get('/', postController.getAllPosts);
postsRouter.get('/:id', postController.getPostById);
postsRouter.post('/', authMiddleware.authenticate, postController.createPost);
postsRouter.delete('/:id', authMiddleware.authenticate, postController.deletePost);

export default postsRouter;