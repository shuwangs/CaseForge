import enqueueCitation from "./citation.queue.js";

await enqueueCitation({
	userId: 1,
	projectId: 99,
	publicationOpenAlexId: "W123456789",
});

console.log("✅ Job added");

process.exit(0);
