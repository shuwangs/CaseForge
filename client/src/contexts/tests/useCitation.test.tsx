import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CitationContext } from "../CitationContext.tsx";
import useCitation from "../useCitation.ts";

describe("useCitation", () => {
	it("throws outside provider", () => {
		expect(() => renderHook(() => useCitation())).toThrow(
			"useCitation must be used within a CiationProvider",
		);
	});

	it("return context value inside provider", () => {
		const value = { loading: false };
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<CitationContext.Provider value={value}>
				{children}
			</CitationContext.Provider>
		);

		const { result } = renderHook(() => useCitation(), { wrapper });
		expect(result.current).toBe(value);
	});
});
