import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import App from "../App";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

describe("App routing tests", () => {
  const originalPathname = window.location.pathname;
  let axiosMock;
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    axiosMock = new AxiosMockAdapter(axios);
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  });

  afterEach(() => {
    queryClient.clear();
    axiosMock.restore();
    window.history.pushState({}, "", originalPathname);
  });

  test("routes /enrollmenthistory/search to EnrollmentHistoryPage", async () => {
    window.history.pushState({}, "", "/enrollmenthistory/search");

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Enrollment History" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Enrollment history graph coming soon."),
    ).toBeInTheDocument();
  });
});
