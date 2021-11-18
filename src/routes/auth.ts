import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

router.get('/', (_req, res) => {
	res.json({
		hello: 'Welcome to my challenge!',
	});
});
router.post('/register', AuthController.registerUser);
router.post('/signin', AuthController.createSession);
export { router as authRouter };
