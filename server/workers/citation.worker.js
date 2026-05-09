import { Worker } from "bullmq";
import { redisConnection } from "../queues/redis.connection.js";
import { fetchCitation, saveCitation } from "../services/citation.service.js";
import { normCitationList } from "../utitls/citation.helper.js";

const citationWorker = new Worker(
	"citation",

	async (job) => {
		console.log("Processing citation job:", job.id);
		// console.log("Job data:", job.data);
		const { _clerkId, projectId, publicationOpenAlexId } = job.data;

		// console.log("clerkId is:", clerkId);
		// console.log("projectId is:", projectId);
		// console.log("publicationOpenAlexId is:", publicationOpenAlexId);

		// 1. fetch citation from OpenAlex
		const citations = await fetchCitation(publicationOpenAlexId);

		// 2. normalize result
		const normalizedCitations = normCitationList(citations);

		// 3. save to DB
		for (const cite of normalizedCitations) {
			await saveCitation(projectId, publicationOpenAlexId, cite);
		}

		return {
			ok: true,
		};
	},
	{
		connection: redisConnection,
		concurrency: 5,
	},
);

citationWorker.on("completed", (job, err) => {
	console.log("Job completed: ", job?.id, err);
});

citationWorker.on("failed", (job, err) => {
	console.log("Job failed: ", job?.id, err);
});

export default citationWorker;
