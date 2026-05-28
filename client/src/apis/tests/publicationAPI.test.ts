import { describe, expect, it, vi } from "vitest";
import { loadPublications } from "../publicationAPI.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

describe("publicationApi", () => {
	it("loads publications for a project", async () => {
		const mockResponse = {
			success: true,
			data: [{ title: "Example publication" }],
		};

		const token = "test-token";
		const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			json: async () => mockResponse,
		} as Response);

		const result = await loadPublications("123", token);

		expect(fetchMock).toHaveBeenCalledWith(
			`${API_BASE_URL}/api/projects/123/publications`,
			expect.any(Object),
		);

		expect(result).toEqual(mockResponse.data);
	});
});
