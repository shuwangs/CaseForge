import { describe, expect, it } from "vitest";
import { validateOrcidId } from "../validateOrcidId.ts";

describe("validateOrcidId", () => {
	it("should return true for a correctly formatted ORCID ID", () => {
		expect(validateOrcidId("0000-0002-1825-0097")).toBe(true);
	});

	it("should return false for invalid formats or empty strings", () => {
		expect(validateOrcidId("invalid-orcid")).toBe(false);
		expect(validateOrcidId("000018250097")).toBe(false);
		expect(validateOrcidId("")).toBe(false);
	});
});
