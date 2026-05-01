import AppError from "../errors/AppError.js";
import { getProjectsByUserId } from "../services/project.service.js";
import { userIdValidate } from "../utitls/userIdValidate.js";
export const getProjects = async (req, res, next) => {
	try {
		const userId = Number(req.params.userId);

		if (!userIdValidate(userId)) {
			throw new AppError("Invalid userId", 400);
		}

		const result = await getProjectsByUserId(userId);

		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};
