import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register";
describe("Register Component", () => {
  test("renders logo", () => {
    render(<Register />, { wrapper: BrowserRouter });
    screen.getByRole("heading", { name: /bellycious/i });
  });
  test("renders login heading", () => {
    render(<Register />, { wrapper: BrowserRouter });
    screen.getByRole("heading", { name: /login/i });
  });
  test("renders register heading", () => {
    render(<Register />, { wrapper: BrowserRouter });
    const button = screen.getByRole("button", { name: /create an account/i });
    fireEvent.click(button);
    screen.getAllByText(/register/i);
  });
  test("renders both inputs", () => {
    render(<Register />, { wrapper: BrowserRouter });
    screen.getByRole("textbox", { name: /input/i });
  });
  test("renders email label", () => {
    render(<Register />, { wrapper: BrowserRouter });
    screen.getByText(/enter email/i);
  });
  test("renders password label", () => {
    render(<Register />, { wrapper: BrowserRouter });
    screen.getByText(/enter password/i);
  });
  test("renders button", () => {
    render(<Register />, { wrapper: BrowserRouter });
    screen.getByRole("button", { name: /button/i });
  });
});
