import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { RecipeContextProvider } from "./store/recipe-context";
import { SearchContextProvider } from "./store/search-context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./routes/Register";
import Profile from "./routes/Profile";

function Appp() {
  return (
    <AuthContextProvider>
      <RecipeContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />}></Route>
              <Route path="*" element={<p>sum ting wong!</p>} />
            </Routes>
          </BrowserRouter>
        </SearchContextProvider>
      </RecipeContextProvider>
    </AuthContextProvider>
  );
}
ReactDOM.render(<Appp />, document.getElementById("root"));
