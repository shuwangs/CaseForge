import { Queue } from "bullmq";
import { redisConnection } from "./redis.connection.js";

const citationsQueue = new Queue("citation", { connection: redisConnection });

// Enqueue
const enqueueCitation = async ({
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
			removeOnComplete: 500,
			removeOnFail: 500,
			jobId: `jobId-${clerkId}-${projectId}-${publicationOpenAlexId}`,
		},
	);
	return job;
};

export default enqueueCitation;
