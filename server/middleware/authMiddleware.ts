import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.ts";

export const authMiddleware = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	try {
		const { userId: clerkId } = getAuth(req);
		if (!clerkId) {
			throw new AppError("Unauthorized", 401);
		}
		req.clerkId = clerkId;

		next();
	} catch (err) {
		next(err);
	}
};
