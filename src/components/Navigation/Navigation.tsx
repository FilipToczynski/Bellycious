import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import SearchContext from "../../store/search-context";

import "../Navigation/Navigation.scss";

const Navigation: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const searchCtx = useContext(SearchContext);

  const [query, setQuery] = useState("");

  console.log(query);

  const inputChange = (event: any) => {
    setQuery(event.target.value);
  };




    searchCtx.pullSearch(query);


  

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className="mainNav">
      <div>Bellycious</div>

      <form>
        <input
          type="text"
          placeholder="search"
          className="mainNav__search"
          onBlur={inputChange}
        ></input>
        <button type="button">
          Search
        </button>
      </form>

      <ul className="mainNav__List">
        {isLoggedIn && (
          <Link to="/favourites" className="mainNav__item">
            Favourites
          </Link>
        )}

        {!isLoggedIn && (
          <Link to="/register" className="mainNav__item">
            register
          </Link>
        )}
        {isLoggedIn && <button onClick={authCtx.logout}>logout</button>}
      </ul>
    </div>
  );
};

export default Navigation;
