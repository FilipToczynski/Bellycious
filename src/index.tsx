import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./routes/Register";

import { AuthContextProvider } from "./store/auth-context";
import Favourites from "./routes/Favourites";
import { RecipeContextProvider } from "./store/recipe-context";
import SearchContext, { SearchContextProvider } from "./store/search-context";

ReactDOM.render(
  <AuthContextProvider>
    <RecipeContextProvider>
      <SearchContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="register" element={<Register />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="*" element={<p>Wrong url!</p>} />
          </Routes>
        </BrowserRouter>
      </SearchContextProvider>
    </RecipeContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
