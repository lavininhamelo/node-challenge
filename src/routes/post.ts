import { Router } from 'express';

import PostController from '../controllers/PostController';
import requireAuth from './middlewares/requireAuth';
import createPostValidator from './validators/post/createPostValidator';
import updatePostValidator from './validators/post/updatePostValidator';

const router = Router();

router.get('/posts', PostController.index);
router.get('/posts/:id', PostController.show);
router.use(requireAuth);
router.post('/posts', createPostValidator, PostController.create);
router.put('/posts/:id', updatePostValidator, PostController.update);
router.delete('/posts/:id', PostController.delete);

export { router as postRouter };
