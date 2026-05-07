import { Queue } from "bullmq";
import { redisConnection } from "./redis.connection.js";

const citationsQueue = new Queue("citation", { connection: redisConnection });

// Enqueue
const enqueueCitation = async ({
	userId,
	projectId,
	publicationOpenAlexId,
}) => {
	const job = await citationsQueue.add(
		"fetch-citation",
		{
			userId,
			projectId,
			publicationOpenAlexId,
		},
		{
			attempts: 5,
			backoff: { type: "exponential", delay: 1000 },
			removeOnComplete: 500,
			removeOnFail: 500,
			jobId: `jobId-${userId}-${projectId}-${publicationOpenAlexId}`,
		},
	);
	return job;
};

export default enqueueCitation;
