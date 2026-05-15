import { Queue } from "bullmq";
import { redisConnection } from "./redis.connection.js";

export const citationsQueue = new Queue("citation", {
	connection: redisConnection,
});

// Enqueue
export const enqueueCitation = async ({
	clerkId,
	projectId,
	publicationOpenAlexId,
}) => {
	const job = await citationsQueue.add(
		"fetch-citation",
		{
			clerkId,
			projectId,
			publicationOpenAlexId,
		},
		{
			attempts: 5,
			backoff: { type: "exponential", delay: 1000 },
			timeout: 60000,
			removeOnComplete: 500,
			removeOnFail: 500,
			jobId: `jobId-${clerkId}-${projectId}-${publicationOpenAlexId}`,
		},
	);
	return job;
};
