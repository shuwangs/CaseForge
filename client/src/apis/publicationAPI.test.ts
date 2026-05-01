import { describe, expect, it, vi } from "vitest";
import { fetchPublications } from "./publicationAPI.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

describe("publicationApi", () => {
	it("fetchPublications sends a POST request with ORCID ID", async () => {
		const mockResponse = {
			success: true,
			data: [{ title: "Example publication" }],
		};

		const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			json: async () => mockResponse,
		} as Response);

		const result = await fetchPublications("0000-0002-2164-6551");
		expect(fetchMock).toHaveBeenCalledWith(
			`${API_BASE_URL}/api/publications/search`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					orcid: "0000-0002-2164-6551",
				}),
			},
		);

		expect(result).toEqual(mockResponse.data);
	});
});
