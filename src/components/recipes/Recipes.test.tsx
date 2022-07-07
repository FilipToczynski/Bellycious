import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";
import Recipes from "./Recipes";
const nock = require("nock");

describe("Recipes Component", () => {
  test("renders logo as link", async () => {
    render(<Recipes />, { wrapper: BrowserRouter });
  });

  test("response on id api call is ok(200)", function () {
    render(<App />, { wrapper: BrowserRouter });
    nock("http://localhost:3000").get("/#35128").reply(200);
  });
  test("response on query api call is ok(200)", function () {
    render(<App />, { wrapper: BrowserRouter });
    nock("http://localhost:3000").get("/").reply(200);
  });
});
