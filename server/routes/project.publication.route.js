import { Router } from "express";
import {
	createProject,
	deleteProject,
	getProjects,
	putProject,
} from "../controllers/project.controller.js";
import { savePublications } from "../controllers/publication.controller.js";
import { enqueueCitationJobs } from "../controllers/citation.controller.js";

const router = Router();

router.post("/:projectId/publications", savePublications);
router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:id", deleteProject);
router.put("/:id", putProject);
router.post("/:projectId/citations/jobs", enqueueCitationJobs);

export default router;
