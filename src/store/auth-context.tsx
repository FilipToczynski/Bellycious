import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "" as string,
  isLoggedIn: false as boolean,
  login: (token: string) => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC<React.ReactNode> = (props) => {
  const initToken = localStorage.getItem("token");
  const [token, setToken] = useState(initToken as string);

  let userIsLoggedIn = !!token as boolean; // *initially false

  const LoginHandler = (token: string) => {
    localStorage.setItem("token", token as string);
    setToken(token);
  };
  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token as string,
    isLoggedIn: userIsLoggedIn as boolean,
    login: LoginHandler as () => {},
    logout: logoutHandler as () => {},
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
