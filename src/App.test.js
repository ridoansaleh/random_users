import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./tests/test-utils";
import { users_api_response } from "./tests/mock-data";
import { formatDateToUTC } from "./utils";
import App from "./App";

const handlers = [
  rest.get("https://randomuser.me/api/", (req, res, ctx) => {
    return res(ctx.json(users_api_response), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => {
  global.matchMedia =
    global.matchMedia ||
    function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    };
  server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("Test App.jsx", () => {
  test("App has search input, gender select, and reset button", async () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("gender-select")).toBeInTheDocument();
    expect(screen.getByTestId("gender-select")).toHaveTextContent("All");
    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
  });

  test("App displays a table with the correct data from server", async () => {
    const firstUser = users_api_response.results[0];
    const username = firstUser.login.username;
    const fullName = `${firstUser.name.first} ${firstUser.name.last}`;
    const registeredDate = formatDateToUTC(firstUser.registered.date);
    renderWithProviders(<App />);
    expect(await screen.findByText(username)).toBeInTheDocument();
    expect(await screen.findByText(fullName)).toBeInTheDocument();
    expect(await screen.findByText(firstUser.email)).toBeInTheDocument();
    expect(await screen.findAllByText(firstUser.gender)).toHaveLength(4);
    expect(await screen.findByText(registeredDate)).toBeInTheDocument();
  });

  test("App displays a table with a pagination of 4 page", async () => {
    renderWithProviders(<App />);
    expect(await screen.findByTitle("1")).toBeInTheDocument();
    expect(await screen.findByTitle("2")).toBeInTheDocument();
    expect(await screen.findByTitle("3")).toBeInTheDocument();
    expect(await screen.findByTitle("4")).toBeInTheDocument();
  });

  test("App able to filter users by keyword", async () => {
    renderWithProviders(<App />);
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Benjamin" } });
    expect(await screen.findAllByText("Benjamin Wilson")).toHaveLength(1);
  });

  test("App able to filter users by gender", async () => {
    renderWithProviders(<App />);
    const genderSelect = screen.getByRole("combobox");
    fireEvent.change(genderSelect, { target: { value: "male" } });
    expect(await screen.findByText("Quinn Morris")).toBeInTheDocument();
  });

  test("App able to reset filters", async () => {
    renderWithProviders(<App />);
    const resetButton = screen.getByTestId("reset-button");
    fireEvent.click(resetButton);
    expect(screen.getByTestId("search-input")).toHaveDisplayValue("");
    expect(screen.getByTestId("gender-select")).toHaveTextContent("All");
  });
});
