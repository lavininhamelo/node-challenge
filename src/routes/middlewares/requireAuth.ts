import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface UserPayload {
	id: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).send({ error: 'No token provided' });
	}
	const [, token] = authHeader.split(' ');

	try {
		const decoded = jwt.verify(token, 'secret') as UserPayload;

		req.user = {
			id: decoded.id,
		};

		return next();
	} catch (err) {
		console.log(err);
	}
};
