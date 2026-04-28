import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchPublications, postPublications } from "./publicationAPI.ts";

describe("publicationApi", async () => {
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
		expect(fetchMock).toHaveBeenCalledWith("api/publications/search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				orcid: "0000-0002-2164-6551",
			}),
		});

		expect(result).toEqual(mockResponse.data);
	});
});
