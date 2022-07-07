
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Profile from './Profile';
const nock = require("nock");

describe("Profile Component", () => {
  test("change password api call is ok(200)", () => {
    render(<Profile />, { wrapper: BrowserRouter });
    nock("http://localhost:3000").get("/profile").reply(200);
  });
  test('renders change password header', () => {
    render(<Profile/>, {wrapper: BrowserRouter});
    screen.getByText(/reset password/i);
  })
  test('renders email label', () => {
    render(<Profile/>, {wrapper: BrowserRouter});
    screen.getByText(/enter email/i)
  });
  test('renders password label', () => {
    render(<Profile/>, {wrapper: BrowserRouter});
    screen.getByText(/new password/i)
  });
  test("renders inputs", () => {
    render(<Profile />, { wrapper: BrowserRouter });
    screen.getByRole("textbox", { name: /input/i });
  });
  test("renders reset button", () => {
    render(<Profile />, { wrapper: BrowserRouter });
    screen.getByRole("button", { name: /reset/i });
  });
});
