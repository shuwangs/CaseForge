import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PublicationContext } from "../PublicationContext.tsx";
import usePublication from "../usePublication.ts";

describe("useProject", () => {
	it("throws outside provider", () => {
		expect(() => renderHook(() => usePublication())).toThrow(
			"usePublication must be used within a PublicationProvider",
		);
	});

	it("return context value inside provider", () => {
		const value = { loading: false };
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<PublicationContext.Provider value={value}>
				{children}
			</PublicationContext.Provider>
		);

		const { result } = renderHook(() => usePublication(), { wrapper });
		expect(result.current).toBe(value);
	});
});
