import { Router } from 'express';

import PostController from '../controllers/PostController';
import requireAuth from './middlewares/requireAuth';

const router = Router();

router.get('/posts', PostController.index);
router.get('/posts/:id', PostController.show);
router.use(requireAuth);
router.post('/posts', PostController.create);
router.put('/posts/:id', PostController.update);
router.delete('/posts/:id', PostController.delete);

export { router as postRouter };
