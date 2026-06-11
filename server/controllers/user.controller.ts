import type { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.ts";
import { getUserByClerkId } from "../services/user.service.ts";

export const getCurrentUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const clerkId = req.clerkId;

		const user = await getUserByClerkId(clerkId);

		if (!user) {
			return next(new AppError("User not found", 401));
		}

		return res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};
