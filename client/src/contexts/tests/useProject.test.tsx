import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectContext } from "../ProjectContext.jsx";
import useProject from "../useProject.js";

describe("useProject", () => {
	it("throws outside provider", () => {
		expect(() => renderHook(() => useProject())).toThrow(
			"useProject must be used within a ProjectProvider",
		);
	});

	it("return context value inside provider", () => {
		const value = { loading: false };
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<ProjectContext.Provider value={value}>
				{children}
			</ProjectContext.Provider>
		);

		const { result } = renderHook(() => useProject(), { wrapper });
		expect(result.current).toBe(value);
	});
});
