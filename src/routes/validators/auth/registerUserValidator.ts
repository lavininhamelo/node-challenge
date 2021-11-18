import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export default async (req: Request, res: Response, next: NextFunction) => {
	check('username').isString().isLength({ min: 3, max: 20 });
	check('email').isEmail().trim();
	check('password').isLength({ min: 6 }).isString();

	const schemaErrors = validationResult(req);

	if (!schemaErrors.isEmpty()) {
		return res.status(401).send(schemaErrors.array());
	} else return next();
};
