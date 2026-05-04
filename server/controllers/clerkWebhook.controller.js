import { verifyWebhook } from "@clerk/backend/webhooks";

import {
    deleteUserByClerkId,
    upsertUserFromClerk,
} from "../services/clerkWebhook.service.js";

export const handleClerkWebhook = async (req, res) => {
    console.log("🔥 webhook hit");

    try {
        const evt = await verifyWebhook(req);
        const eventType = evt.type;
        const user = evt.data;
        console.log("✅ event type:", evt.type);
        console.log("✅ user id:", evt.data.id);
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
