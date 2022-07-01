import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";

describe("Navigation Component", () => {
  test("renders logo as link", () => {
    render(<Navigation />, { wrapper: BrowserRouter });
    screen.getByRole("link", { name: /Bellycious/i });
  });

  test("renders register button as link", () => {
    render(<Navigation />, { wrapper: BrowserRouter });
    screen.getByRole("link", { name: /Register/i });
  });

  test("renders search bar", () => {
    render(<Navigation />, { wrapper: BrowserRouter });
    screen.getByRole("textbox", { name: /input/i });
  });

  test("renders search button", () => {
    render(<Navigation />, { wrapper: BrowserRouter });
    screen.getByRole("button", { name: /search/i });
  });

  test("does not render logout button", () => {
    render(<Navigation />, { wrapper: BrowserRouter });
    const logutoutBtn = screen.queryByLabelText(/logout/i);
    expect(logutoutBtn).toBeNull();
  });
});
