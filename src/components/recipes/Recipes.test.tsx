import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Recipes from "./Recipes";

describe("Recipes Component", () => {
  test("renders logo as link", async () => {
    render(<Recipes />, { wrapper: BrowserRouter });

    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);
    await screen.findByText('shit')
  });
});
