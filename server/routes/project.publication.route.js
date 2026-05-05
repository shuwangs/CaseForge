import { Router } from "express";
import { getProjects } from "../controllers/project.controller.js";
import { savePublications } from "../controllers/project.publication.controller.js";

const router = Router();

router.post("/:projectId/publications", savePublications);
router.get("/", getProjects);

export default router;
