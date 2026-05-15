import express, { Router } from "express";
import { handleClerkWebhook } from "../controllers/clerkWebhook.controller.js";

const router = Router();

router.post(
	"/clerk",
	express.raw({ type: "application/json" }),
	handleClerkWebhook,
);
export default router;
