import AppError from "../errors/AppError.js";
import {
	addProject,
	deleteProjectById,
	getProjectsByUserId,
	updateProjectById,
} from "../services/project.service.js";
import { idValidate } from "../utitls/idValidate.js";
export const getProjects = async (req, res, next) => {
	try {
		const userId = Number(req.params.userId);

		if (!idValidate(userId)) {
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

export const createProject = async (req, res, next) => {
	try {
		const project = req.body;
		console.log("in controller the passed in project is ", project);
		if (!idValidate(project.userId)) {
			throw new AppError("Invalid userId", 400);
		}

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
		console.log("request params: ", req.params);
		const projectId = req.params.id;
		console.log("in controller the tobe delelte projectID is ", projectId);
		if (!idValidate(projectId)) {
			throw new AppError("Invalid Project", 400);
		}

		const result = await deleteProjectById(projectId);

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
		console.log("in putProject controller request params: ", req.params);
		const projectId = req.params.id;
		console.log("in controller the tobe updated projectID is ", projectId);

		const payload = req.body;
		console.log("in controller the tobe updated project field ", payload);

		if (!idValidate(projectId)) {
			throw new AppError("Invalid Project", 400);
		}

		const result = await updateProjectById(projectId, payload);

		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};
