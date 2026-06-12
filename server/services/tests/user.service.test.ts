import { beforeEach, describe, expect, it, vi } from "vitest";
import pool from "../../db/db.js";
import { getUserByClerkId } from "../user.service.js";

vi.mock("../../db/db.js", () => ({
	default: {
		query: vi.fn(),
	},
}));

beforeEach(() => {
	vi.clearAllMocks();
});

describe("user.service", () => {
	it("getUserByClerkId returns user when found", async () => {
		pool.query.mockResolvedValue({
			rows: [{ id: 1, clerk_id: "clerk_123", email: "test@test.com" }],
		});

		const result = await getUserByClerkId("clerk_123");

		expect(pool.query).toHaveBeenCalledWith(expect.any(String), ["clerk_123"]);
		expect(result).toEqual({
			id: 1,
			clerk_id: "clerk_123",
			email: "test@test.com",
		});
	});

	it("getUserByClerkId returns null when not found", async () => {
		pool.query.mockResolvedValue({ rows: [] });

		const result = await getUserByClerkId("nonexistent");

		expect(result).toBeNull();
	});
});
