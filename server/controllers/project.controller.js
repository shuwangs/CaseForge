import AppError from "../errors/AppError.js";
import { getAuth } from "@clerk/express";
import { getProjectsByUserId, getProjectsByClerkId } from "../services/project.service.js";

export const getProjects = async (req, res, next) => {
	try {
		const { userId: clerkId } = getAuth(req);
		console.log("clerkId from Clerk:", clerkId);

		if (!clerkId) {
			throw new AppError("Unauthorized", 401);
		}

		const result = await getProjectsByClerkId(clerkId);

		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};
