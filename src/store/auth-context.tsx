import React, { useState } from "react";

const AuthContext = React.createContext ({
    token: '' as string,
    isLoggedIn: false as boolean,
    login: (token: string) => {},
    logout: () => {},
}) 



export const AuthContextProvider: React.FC<React.ReactNode> = (props) => {
  const initToken = localStorage.getItem('token');
    const [token, setToken] = useState(initToken as string);

    const userIsLoggedIn = !!token; // boolean value !!

    const LoginHandler = (token: string) => {
        setToken(token)
        localStorage.setItem('token', token)
    };
    const logoutHandler = () => {
        setToken('')
    };

    const contextValue = {
        token: token, 
        isLoggedIn: userIsLoggedIn,
        login: LoginHandler,
        logout: logoutHandler,
    }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
