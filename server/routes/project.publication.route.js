import { Router } from "express";
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

export default router;
