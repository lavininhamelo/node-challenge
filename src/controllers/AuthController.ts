import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
	async registerUser(req: Request, res: Response) {
		const { email, username } = req.body;

		try {
			if (await User.findOne({ email })) {
				return res.status(400).json({ error: 'Usuário already exists' });
			}

			if (await User.findOne({ username })) {
				return res.status(400).json({ error: 'Usuário already exists' });
			}

			const user = await User.create(req.body);
			return res.json(user);
		} catch (err) {
			return res.status(400).json({ error: 'Unknown error', err });
		}
	}
	async createSession(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				return res.status(403).json({ error: 'Password do not match' });
			}

			if (!(await user.compareHash(password))) {
				return res.status(403).json({ error: 'Password do not match' });
			}

			return res.json({
				token: user.generateToken(),
				user,
			});
		} catch (err) {
			return res.status(400).json({ error: 'Unknown error', err });
		}
	}
}

export default new UserController();
