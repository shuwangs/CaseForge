import AppError from "../errors/AppError.js";
import {
	addProject,
	deleteProjectById,
	getProjectsByClerkId,
	updateProjectById,
} from "../services/project.service.js";
import { getUserByClerkId } from "../services/user.service.js";

import { idValidate } from "../utitls/idValidate.js";

export const getProjects = async (req, res, next) => {
	try {

		const clerkId = req.clerkId;

		const result = await getProjectsByClerkId(clerkId);

		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

export const createProject = async (req, res, next) => {
	try {
		const clerkId = req.clerkId;

		const dbUser = await getUserByClerkId(clerkId);
		if (!dbUser) {
			throw new AppError("User not found", 404);
		}

		const project = {
			...req.body,
			userId: dbUser.id,
		};

		console.log("in controller the passed in project is ", project);

		const result = await addProject(project);

		res.status(201).json({
			success: true,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

export const deleteProject = async (req, res, next) => {
	try {
		const clerkId = req.clerkId;

		const projectId = req.params.id;
		console.log("in controller the tobe delelte projectID is ", projectId);
		if (!idValidate(projectId)) {
			throw new AppError("Invalid Project", 400);
		}

		const result = await deleteProjectById(projectId, clerkId);

		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

export const putProject = async (req, res, next) => {
	try {
		const clerkId = req.clerkId;

		const projectId = req.params.id;

		const payload = req.body;
		console.log("in controller the tobe updated project field ", payload);

		if (!idValidate(projectId)) {
			throw new AppError("Invalid Project", 400);
		}

		const result = await updateProjectById(projectId, payload, clerkId);

		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};
