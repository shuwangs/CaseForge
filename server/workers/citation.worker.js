import { Worker } from "bullmq";
import { redisConnection } from "../queues/redis.connection.js";

const citationWorker = new Worker(
	"citation",

	async (job) => {
		console.log("Processing citation job:", job.id);
		console.log("Job data:", job.data);
		const { userId, projectId, publicationOpenAlexId } = job.data;

		console.log("userId is:", userId);
		console.log("projectId is:", projectId);
		console.log("publicationOpenAlexId is:", publicationOpenAlexId);
		// TODO:
		// 1. fetch citation from OpenAlex
		// 2. normalize result
		// 3. save to DB

		return {
			ok: true,
		};
	},
	{
		connection: redisConnection,
		concurrency: 5,
	},
);

citationWorker.on("completed", (job) => {
	console.log("Job completed: ", job.id);
});

citationWorker.on("failed", (job, err) => {
	console.log("Job failed: ", job.id, err);
});

export default citationWorker;
