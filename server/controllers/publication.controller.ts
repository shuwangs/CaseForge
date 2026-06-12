import type { NextFunction, Request, Response } from "express";

import AppError from "../errors/AppError.js";
import {
	getPublicationsByProjectId,
	importPublicationsByOrcid,
	saveProjectPublication,
	searchPublicationsByOrcid,
} from "../services/publication.service.js";
import {
	mapPublicationDTO,
	validateOrcid,
} from "../utitls/publication.helper.js";

export const searchPublications = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { orcid } = req.body;
		const _clerkId = req.clerkId;

		if (!validateOrcid(orcid)) {
			throw new AppError("Wrong Orcid ID", 400);
		}

		const result = await searchPublicationsByOrcid(orcid);
		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const savePublications = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const _clerkId = req.clerkId;

		const { projectId } = req.params;
		const { publications } = req.body;

		const result = await saveProjectPublication(projectId, publications);

		res.status(201).json({
			success: true,
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const importProjectPublications = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { projectId } = req.params;
		const { orcid } = req.body;
		const clerkId = req.clerkId;

		const publications = await importPublicationsByOrcid(
			clerkId,
			projectId,
			orcid,
		);

		const mappedPublications = publications.map(mapPublicationDTO);
		res.status(201).json({
			message: "Publications imported successfully",
			count: publications.length,
			data: mappedPublications,
		});
	} catch (error) {
		next(error);
	}
};

export const getProjectPublications = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { projectId } = req.params;
		const clerkId = req.clerkId;

		const publications = await getPublicationsByProjectId(clerkId, projectId);

		const mappedPublications = publications.map(mapPublicationDTO);
		res.status(200).json({
			success: true,
			data: mappedPublications,
		});
	} catch (error) {
		next(error);
	}
};
