import { Webhook } from "svix";
import {
	deleteUserByClerkId,
	upsertUserFromClerk,
} from "../services/clerkWebhook.service.js";

export const handleClerkWebhook = async (req, res) => {
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
	if (!WEBHOOK_SECRET) {
		throw new Error("Missing webhook signing secret.");
	}
	const headers = req.headers;

	const payload = req.body;

	const wh = new Webhook(WEBHOOK_SECRET);
	let evt;

	try {
		evt = wh.verify(payload, headers);

		// Handle the webhook
		const user = evt.data;
		const eventType = evt.type;

		if (eventType === "user.created" || eventType === "user.updated") {
			const email = user.email_addresses?.[0]?.email_address ?? null;

			await upsertUserFromClerk(user.id, email);
		}

		if (eventType === "user.deleted") {
			if (user.id) {
				await deleteUserByClerkId(user.id);
			}
		}

		return res
			.status(200)
			.json({ success: true, message: "Webhook processed" });
	} catch (err) {
		console.error("Webhook failed:", err);
		return res.status(400).json({ error: "Invalid webhook" });
	}
};
