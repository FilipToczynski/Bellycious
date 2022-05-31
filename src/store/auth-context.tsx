import React, { useState } from "react";

const AuthContext = React.createContext ({
    token: '' as string,
    isLoggedIn: false,
    login: (token: string) => {},
    logout: () => {},
}) 



export const AuthContextProvider: React.FC<React.ReactNode> = (props) => {

    const [token, setToken] = useState('');

    const userIsLoggedIn = !!token; // boolean value !!

    const LoginHandler = (token: string) => {
        setToken(token)
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
