
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Profile from './Profile';
describe("Profile Component", () => {
  test("renders logo as link", async () => {
    render(<Profile />, { wrapper: BrowserRouter });

  });
});
