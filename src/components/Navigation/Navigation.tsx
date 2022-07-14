import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import SearchContext from "../../store/search-context";
import "../Navigation/Navigation.scss";

const Navigation: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const searchCtx = useContext(SearchContext);
  const [query, setQuery] = useState("");
  const recipeView = document.querySelector(".recipeView") as HTMLDivElement;
  const recipeList = document.querySelector(".recipe__list") as HTMLElement;
  const isLoggedIn = authCtx.isLoggedIn;

  const logOut = () => {
    authCtx.logout();
  };

  const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuery(event.target.value.toLowerCase());
  };

  const clearView = () => {
    recipeView!.innerHTML = "";
    recipeList!.innerHTML = "";
  };

  // doesnt clear the list clears the list for the current query
  const HandleInputOnKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
      HandleInputChange(event as any);
      recipeView!.innerHTML = "";
      recipeList!.innerHTML = "";
    }
  };

  // solves bad set state() call error
  useEffect(() => {
    searchCtx.pullSearch(query);
    //eslint-disable-next-line
  }, [query]);

  return (
    <div className="mainNav">
      <a href="/">
        <h1>Bellycious</h1>
      </a>

      <form>
        <input
          type="text"
          placeholder="search"
          className="mainNav__search"
          aria-label="input"
          onBlur={HandleInputChange}
          onKeyDown={HandleInputOnKeyPress}
        ></input>

        <button
          type="button"
          onClick={clearView}
          className="mainNav__searchBtn"
        >
          Search
        </button>
      </form>

      {!isLoggedIn && (
        <Link to="/register" className="mainNav__btn">
          <p>Register</p>
        </Link>
      )}
      {isLoggedIn && (
        <Link to="profile" className="mainNav__profile">
          My Profile
        </Link>
      )}

      {isLoggedIn && (
        <button onClick={logOut} className="mainNav__btn" aria-label="logout">
          Logout
        </button>
      )}
    </div>
  );
};

export default Navigation;
