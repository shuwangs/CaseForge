import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useForm from "./useForm.js";

describe("useForm", () => {
	it("should initialize formdata with initial Data", () => {
		const initialData = {
			firstName: "Bobo",
			lastName: "Wang",
		};

		const { result } = renderHook(() => useForm(initialData));
		expect(result.current.formData).toEqual(initialData);
	});

	it("setFormData should allow replacing form data manually", () => {
		const initialData = {
			firstName: "Bobo",
			lastName: "Wang",
		};

		const { result } = renderHook(() => useForm(initialData));

		act(() => {
			result.current.setFormData({
				firstName: "Case",
				lastName: "Forge",
			});
		});

		expect(result.current.formData).toEqual({
			firstName: "Case",
			lastName: "Forge",
		});
	});

	it("resetForm should restore initial data", async () => {
		const initialData = {
			firstName: "Bobo",
			lastName: "Wang",
		};

		const { result } = renderHook(() => useForm(initialData));

		await act(async () => {
			result.current.handleChange({
				target: {
					name: "firstName",
					value: "CaseForge",
				},
			});
		});

		expect(result.current.formData.firstName).toBe("CaseForge");

		await act(async () => {
			result.current.resetForm();
		});

		expect(result.current.formData).toEqual(initialData);
	});
});
