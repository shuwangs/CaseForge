import "@testing-library/jest-dom/vitest";
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";

import { useContext } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SummaryContext, SummaryProvider } from "../SummaryContext.js";

//  Mock Clerk
const mockGetToken = vi.fn().mockResolvedValue("mock-clerk-token");
vi.mock("@clerk/react-router", () => ({
	useAuth: () => ({
		getToken: mockGetToken,
	}),
}));

vi.mock("../../apis/summaryApi.ts", () => ({
	fetchProjectSummary: vi.fn(),
	generateJournalTableSummary: vi.fn(),
	generateMapSummary: vi.fn(),
	generateTrendSummary: vi.fn(),
}));

import {
	fetchProjectSummary,
	generateJournalTableSummary,
	generateMapSummary,
	generateTrendSummary,
} from "../../apis/summaryApi.ts";

const TestConsumer = () => {
	const {
		error,
		loading,
		journalTableSummary,
		mapSummary,
		trendSummary,
		handleGenerateJournalTableSummary,
		handleGenerateMapSummary,
		handleGenerateTrendSummary,
		loadProjectSummary,
	} = useContext(SummaryContext);

	return (
		<div>
			<div data-testid="loading">{loading ? "Loading" : "Idle"}</div>
			<div data-testid="error">{error}</div>
			<div data-testid="journal-summary">{journalTableSummary}</div>
			<div data-testid="map-summary">{mapSummary}</div>
			<div data-testid="trend-summary">{trendSummary}</div>

			<button
				type="button"
				onClick={() => loadProjectSummary(1).catch(() => {})}
			>
				Load Summary
			</button>

			<button
				type="button"
				onClick={() => handleGenerateJournalTableSummary(1).catch(() => {})}
			>
				Journal Summary
			</button>

			<button
				type="button"
				onClick={() => handleGenerateMapSummary(1).catch(() => {})}
			>
				Map Summary
			</button>

			<button
				type="button"
				onClick={() => handleGenerateTrendSummary(1).catch(() => {})}
			>
				Trend Summary
			</button>
		</div>
	);
};

describe("SummaryContext an SummaryProvier", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockGetToken.mockResolvedValue("mock-token");
	});

	afterEach(() => {
		cleanup();
	});

	it("loadProjectSummary should load and set all summary values", async () => {
		vi.mocked(fetchProjectSummary).mockResolvedValue({
			ai_overview: "Journal overview summary",
			ai_trend: "Citation trend summary",
			ai_geographic: "Geographic map summary",
		});

		render(
			<SummaryProvider>
				<TestConsumer />
			</SummaryProvider>,
		);

		fireEvent.click(screen.getByText("Load Summary"));

		await waitFor(() => {
			expect(fetchProjectSummary).toHaveBeenCalledWith(1, "mock-token");
		});

		expect(screen.getByTestId("journal-summary")).toHaveTextContent(
			"Journal overview summary",
		);
		expect(screen.getByTestId("trend-summary")).toHaveTextContent(
			"Citation trend summary",
		);
		expect(screen.getByTestId("map-summary")).toHaveTextContent(
			"Geographic map summary",
		);
		expect(screen.getByTestId("loading")).toHaveTextContent("Idle");
	});

	// handleGenerateJournalTableSummary
	it("generateJournalTableSummary should generate and set journal summary", async () => {
		vi.mocked(generateJournalTableSummary).mockResolvedValue({
			summary: "Generated journal summary",
		});

		render(
			<SummaryProvider>
				<TestConsumer />
			</SummaryProvider>,
		);

		fireEvent.click(screen.getByText("Journal Summary"));

		await waitFor(() => {
			expect(generateJournalTableSummary).toHaveBeenCalledWith(1, "mock-token");
		});

		expect(screen.getByTestId("journal-summary")).toHaveTextContent(
			"Generated journal summary",
		);
	});

	// handleGenerateMapSummary
	it("generateJournalTableSummary should generate and set map summary", async () => {
		vi.mocked(generateMapSummary).mockResolvedValue({
			summary: "Generated map summary",
		});

		render(
			<SummaryProvider>
				<TestConsumer />
			</SummaryProvider>,
		);

		fireEvent.click(screen.getByText("Map Summary"));

		await waitFor(() => {
			expect(generateMapSummary).toHaveBeenCalledWith(1, "mock-token");
		});

		expect(screen.getByTestId("map-summary")).toHaveTextContent(
			"Generated map summary",
		);
	});

	// handleGenerateTrendSummary
	it("generateJournalTableSummary should generate and set map summary", async () => {
		vi.mocked(generateTrendSummary).mockResolvedValue({
			summary: "Generated trend summary",
		});

		render(
			<SummaryProvider>
				<TestConsumer />
			</SummaryProvider>,
		);

		fireEvent.click(screen.getByText("Trend Summary"));

		await waitFor(() => {
			expect(generateTrendSummary).toHaveBeenCalledWith(1, "mock-token");
		});

		expect(screen.getByTestId("trend-summary")).toHaveTextContent(
			"Generated trend summary",
		);
	});

	// when auth failed

	it("should set error when auth token is missing", async () => {
		mockGetToken.mockResolvedValue(null);
		render(
			<SummaryProvider>
				<TestConsumer />
			</SummaryProvider>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Load Summary" }));
		await waitFor(() => {
			expect(screen.getByTestId("error")).toHaveTextContent(
				"Missing auth token",
			);
		});

		expect(fetchProjectSummary).not.toHaveBeenCalled();
	});
});
