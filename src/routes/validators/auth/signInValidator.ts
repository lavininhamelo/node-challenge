import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export default async (req: Request, res: Response, next: NextFunction) => {
	check('email', 'Please, enter your email address').notEmpty();
	check('password', 'Please, enter a valid password').notEmpty().isString();

	const schemaErrors = validationResult(req);

	if (!schemaErrors.isEmpty()) {
		return res.status(401).send(schemaErrors.array());
	} else return next();
};
