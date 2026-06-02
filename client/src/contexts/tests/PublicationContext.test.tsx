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
import {
	PublicationContext,
	PublicationProvider,
} from "../PublicationContext.tsx";

//  Mock Clerk
const mockGetToken = vi.fn().mockResolvedValue("mock-clerk-token");
vi.mock("@clerk/react-router", () => ({
	useAuth: () => ({
		getToken: mockGetToken,
	}),
}));

vi.mock("../useProject.js", () => ({
	default: () => ({
		getProjectStatus: vi.fn(),
	}),
}));

vi.mock("../../apis/publicationAPI.ts", () => ({
	fetchPublications: vi.fn(),
	loadPublications: vi.fn(),
}));

import {
	fetchPublications,
	loadPublications,
} from "../../apis/publicationAPI.ts";

const TestConsumer = () => {
	const {
		publications,
		loading,
		error,
		onFetchPublication,
		loadProjectPublications,
	} = useContext(PublicationContext);

	return (
		<div>
			<div data-testid="loading">{loading ? "Loading..." : "Idle"}</div>
			<div data-testid="error">{error || "No Error"}</div>
			<div data-testid="pub-count">{publications.length}</div>

			<button
				type="button"
				onClick={() => onFetchPublication("orcid-123", "proj-999")}
			>
				Fetch Pubs
			</button>
			<button type="button" onClick={() => loadProjectPublications("proj-999")}>
				Load Pubs
			</button>

			<ul>
				{publications.map((p, idx) => (
					<li key={idx} data-testid="pub-item">
						{p.title}
					</li>
				))}
			</ul>
		</div>
	);
};

describe("PublicationContext & PublicationProvider", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	it("fetch publications successfully using ORCID", async () => {
		const mockData = [{ title: "Paper A" }, { title: "Paper B" }];

		vi.mocked(fetchPublications).mockResolvedValue(mockData);
		render(
			<PublicationProvider>
				<TestConsumer />
			</PublicationProvider>,
		);

		fireEvent.click(screen.getByText("Fetch Pubs"));

		await waitFor(() => {
			expect(fetchPublications).toHaveBeenCalledWith(
				"orcid-123",
				"mock-clerk-token",
				"proj-999",
			);
		});
	});

	it("load the publications tha that exists", async () => {
		const mockData = [{ title: "Existing Paper" }];
		vi.mocked(loadPublications).mockResolvedValue(mockData);

		render(
			<PublicationProvider>
				<TestConsumer />
			</PublicationProvider>,
		);

		fireEvent.click(screen.getByText("Load Pubs"));

		await waitFor(() => {
			expect(loadPublications).toHaveBeenCalledWith(
				"proj-999",
				"mock-clerk-token",
			);
		});

		await waitFor(() => {
			expect(screen.getByTestId("pub-count").textContent).toBe("1");
			expect(screen.getByText("Existing Paper")).toBeInTheDocument();
		});
	});

	it("onFetchPublication faileds, catch the error", async () => {
		vi.mocked(fetchPublications).mockRejectedValue(
			new Error("ORCID not found"),
		);
		render(
			<PublicationProvider>
				<TestConsumer />
			</PublicationProvider>,
		);

		fireEvent.click(screen.getByText("Fetch Pubs"));
		await waitFor(() => {
			expect(screen.getByTestId("error").textContent).toBe("ORCID not found");
		});
	});
});
