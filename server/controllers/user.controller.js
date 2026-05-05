import AppError from "../errors/AppError.js";
export const getCurrentUser = async (req, res, next) => {
	try {
		const clerkId = req.auth.userId;
		if (!clerkId) {
			throw new AppError("Missing Clerk user ID", 401);
		}
		const user = await getUserByClerkId(clerkId);

		if (!user) {
			return next(new AppError("User not found", 404));
		}

		return res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};
