import { Router } from 'express';
import AuthController from '../controllers/AuthController';

import registerUserValidator from './validators/auth/registerUserValidator';
import signInValidator from './validators/auth/signInValidator';

const router = Router();

router.get('/', (_req, res) => {
	res.json({
		hello: 'Welcome to my challenge!',
	});
});
router.post('/register', registerUserValidator, AuthController.registerUser);
router.post('/signin', signInValidator, AuthController.createSession);
export { router as authRouter };
