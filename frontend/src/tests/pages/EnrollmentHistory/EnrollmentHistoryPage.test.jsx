import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EnrollmentHistoryPage from "main/pages/EnrollmentHistory/EnrollmentHistoryPage";

vi.mock("main/utils/currentUser", () => ({
  useCurrentUser: () => ({
    data: { loggedIn: false, root: null },
  }),
  useLogout: () => ({ mutate: vi.fn() }),
  hasRole: () => false,
}));

vi.mock("main/utils/systemInfo", () => ({
  useSystemInfo: () => ({ data: {} }),
}));

describe("EnrollmentHistoryPage tests", () => {
  test("renders the Enrollment History placeholder", () => {
    render(
      <MemoryRouter>
        <EnrollmentHistoryPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Enrollment History" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Enrollment history graph coming soon."),
    ).toBeInTheDocument();
  });
});
