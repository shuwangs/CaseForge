import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import FormInputField from "../FormInputField.js";

describe("FormInputField", () => {
	afterEach(() => {
		cleanup();
	});
	it("renders label, value, and placeholer", () => {
		render(
			<FormInputField
				label="First Name"
				id="firstName"
				name="firstName"
				value="test"
				placeholder="Enter first name"
				onChange={vi.fn()}
			/>,
		);

		const input = screen.getByLabelText("First Name");
		expect(input).toHaveValue("test");
		expect(input).toHaveAttribute("name", "firstName");
		expect(input).toHaveAttribute("placeholder", "Enter first name");
	});

	it("it calls onChange when input changes", () => {
		const onChange = vi.fn();

		render(
			<FormInputField
				label="First Name"
				id="firstName"
				name="firstName"
				value=""
				placeholder="Enter first name"
				onChange={onChange}
			/>,
		);

		const input = screen.getByLabelText("First Name");

		fireEvent.change(input, {
			target: { value: "testCase" },
		});
		expect(onChange).toHaveBeenCalledTimes(1);
	});
});
