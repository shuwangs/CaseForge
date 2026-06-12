import { Router } from "express";
import { searchPublications } from "../controllers/publication.controller.ts";

const router = Router();

router.post("/search", searchPublications);

export default router;
