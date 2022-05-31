import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "../Navigation/Navigation.scss";

const Navigation: React.FC = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className="mainNav">
      <div>Bellycious</div>

      <form>
        <input
          type="text"
          placeholder="search"
          className="mainNav__search"
        ></input>
        <button type="submit">Search</button>
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
        {isLoggedIn && (
          <button onClick={authCtx.logout}>logout</button>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
