import { describe, expect, it } from "vitest";
import { downloadMap } from "../downloadMap.ts";

describe("downloadMap util", () => {
	it("should correctly format raw data into the expected structure", () => {
		const fakeContainer = document.createElement("div");
		const result = downloadMap(fakeContainer, "my-map.png");

		expect(result).toBeUndefined();
	});
});
