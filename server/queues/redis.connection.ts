import Redis from "ioredis";

export const redisConnection = new Redis(
	process.env.REDIS_URL ?? "redis://localhost:6379",
	{
		maxRetriesPerRequest: null,
		enableReadyCheck: false,
	},
);

redisConnection.on("error", (err) => console.log("Redis client error", err));
