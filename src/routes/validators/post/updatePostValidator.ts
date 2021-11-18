import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export default async (req: Request, res: Response, next: NextFunction) => {
	check('title').isString();
	check('body').isString();
	check('tags').isArray();

	const schemaErrors = validationResult(req);

	if (!schemaErrors.isEmpty()) {
		return res.status(401).send(schemaErrors.array());
	} else return next();
};
