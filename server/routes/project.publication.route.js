import { Router } from "express";
import { enqueueCitationJobs, getCitationsMap, getCitationsYearlyCounts, getProjectCitations, getCitationStatus } from "../controllers/citation.controller.js";
import {
	createProject,
	deleteProject,
	getProjects,
	putProject,
} from "../controllers/project.controller.js";
import { savePublications } from "../controllers/publication.controller.js";

const router = Router();

router.post("/:projectId/publications", savePublications);
router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:id", deleteProject);
router.put("/:id", putProject);
router.post("/:projectId/citations/jobs", enqueueCitationJobs);
router.get("/:projectId/citation-counts", getProjectCitations);
router.get("/:projectId/yearly-counts", getCitationsYearlyCounts);
router.get("/:projectId/map", getCitationsMap);
router.get("/:projectId/citations/status", getCitationStatus);

export default router;
