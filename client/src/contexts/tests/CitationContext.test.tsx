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

const mockGetToken = vi.hoisted(() => vi.fn());
const mockNavigate = vi.hoisted(() => vi.fn());

// Mock Clerk
vi.mock("@clerk/react-router", () => ({
	useAuth: () => ({
		getToken: mockGetToken,
		isSignedIn: true,
		isLoaded: true,
	}),
}));

// Mock api

vi.mock("../../apis/citationApi.ts", () => ({
	getCitations: vi.fn(),
	fetchCitationYearlyCounts: vi.fn(),
	fetchCitationMapData: vi.fn(),
	fetchJournalPublicationData: vi.fn(),
}));

vi.mock("react-router", async (importOriginal) => {
	const actual = await importOriginal<typeof import("react-router")>();

	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

import {
	fetchCitationMapData,
	fetchCitationYearlyCounts,
	fetchJournalPublicationData,
	getCitations,
} from "../../apis/citationApi.ts";
import { CitationContext, CitationProvider } from "../CitationContext.tsx";

const TestConsumer = () => {
	const {
		citationMap,
		citationYearlyCount,
		journalPublicationData,
		error,
		loading,
		isPolling,
		loadCitationResults,
		handleFetchCitations,
		startPollingCitationStatus,
	} = useContext(CitationContext);

	return (
		<div>
			<div data-testid="loading">{loading ? "Loading" : "Idle"}</div>
			<div data-testid="polling">{isPolling ? "Polling" : "Not Polling"}</div>
			<div data-testid="error">{error}</div>
			<div data-testid="map-data">{JSON.stringify(citationMap)}</div>
			<div data-testid="yearly-data">{JSON.stringify(citationYearlyCount)}</div>
			<div data-testid="journal-data">
				{JSON.stringify(journalPublicationData)}
			</div>

			<button
				type="button"
				onClick={() => loadCitationResults(1).catch(() => {})}
			>
				Load Citation Results
			</button>

			<button
				type="button"
				onClick={() => handleFetchCitations(1).catch(() => {})}
			>
				Fetch Citations
			</button>

			<button type="button" onClick={() => startPollingCitationStatus(1)}>
				Start Polling
			</button>
		</div>
	);
};

describe("CitationContext", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockGetToken.mockResolvedValue("mock-token");
	});

	afterEach(() => {
		cleanup();
		vi.useRealTimers();
	});

	it("loadCitationResults should load and set citation dashboard data", async () => {
		const mockJournalData = [{ journal: "Nature", publication_count: 2 }];
		const mockYearlyData = [{ citing_year: 2025, citation_count: 3 }];
		const mockMapData = [{ country: "US", value: 4 }];

		vi.mocked(fetchJournalPublicationData).mockResolvedValue(mockJournalData);
		vi.mocked(fetchCitationYearlyCounts).mockResolvedValue(mockYearlyData);
		vi.mocked(fetchCitationMapData).mockResolvedValue(mockMapData);

		render(
			<CitationProvider>
				<TestConsumer />
			</CitationProvider>,
		);

		fireEvent.click(screen.getByText("Load Citation Results"));
		await waitFor(() => {
			expect(fetchJournalPublicationData).toHaveBeenCalledWith(1, "mock-token");
			expect(fetchCitationYearlyCounts).toHaveBeenCalledWith(1, "mock-token");
			expect(fetchCitationMapData).toHaveBeenCalledWith(1, "mock-token");
		});

		expect(screen.getByTestId("journal-data")).toHaveTextContent("Nature");
		expect(screen.getByTestId("yearly-data")).toHaveTextContent("2025");
		expect(screen.getByTestId("map-data")).toHaveTextContent("US");
	});

	it("loadCitationResults should set error when loading citation data fails", async () => {
		vi.mocked(fetchJournalPublicationData).mockRejectedValue(
			new Error("Failed to load citation data"),
		);
		vi.mocked(fetchCitationYearlyCounts).mockResolvedValue([]);
		vi.mocked(fetchCitationMapData).mockResolvedValue([]);

		render(
			<CitationProvider>
				<TestConsumer />
			</CitationProvider>,
		);

		fireEvent.click(screen.getByText("Load Citation Results"));
		await waitFor(() => {
			expect(screen.getByTestId("error")).toHaveTextContent(
				"Failed to load citation data",
			);
		});

		expect(screen.getByTestId("loading")).toHaveTextContent("Idle");
	});

	it("handleFetchCitations should enqueue citation jobs and navigate to dashboard", async () => {
		vi.mocked(getCitations).mockResolvedValue({ jobsQueued: 3 });
		render(
			<CitationProvider>
				<TestConsumer />
			</CitationProvider>,
		);

		fireEvent.click(screen.getByText("Fetch Citations"));
		await waitFor(() => {
			expect(getCitations).toHaveBeenCalledWith(1, "mock-token");
		});

		expect(mockNavigate).toHaveBeenCalledWith("/projects/1/dashboard");
		expect(screen.getByTestId("loading")).toHaveTextContent("Idle");
	});

	it("handleFetchCitations should set error when enqueue error", async () => {
		vi.mocked(getCitations).mockRejectedValue(new Error("Queue failed"));
		render(
			<CitationProvider>
				<TestConsumer />
			</CitationProvider>,
		);
		fireEvent.click(screen.getByText("Fetch Citations"));

		await waitFor(() => {
			expect(screen.getByTestId("error")).toHaveTextContent("Queue failed");
		});
		expect(mockNavigate).not.toHaveBeenCalled();
	});
});
