import { getAuth } from "@clerk/express";
import AppError from "../errors/AppError";

export const authMiddleware = (req, _res, next) => {
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
