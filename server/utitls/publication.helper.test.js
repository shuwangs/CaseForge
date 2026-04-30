import { describe, expect, it } from "vitest";

import { extractIds } from "./publication.helper.js";

describe("publication.helper test", () => {
	describe("extractIds", () => {
		it("extracts doi, openalexId, and pmid from the id strings", () => {
			const idString =
				"doi:10.1002/ps.7676 openalex:W4385074293 omid:br/06290184524";

			const result = extractIds(idString);
			expect(result).toEqual({
				doi: "10.1002/ps.7676",
				openalexId: "W4385074293",
				pmid: null,
			});
		});
	});
});
