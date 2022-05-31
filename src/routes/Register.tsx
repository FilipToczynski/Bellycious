import { useContext, useRef, useState } from "react";
import AuthContext from "../store/auth-context";

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoggedIn, setLogin] = useState(false);

  const switchAuthModeHandler = () => {
    setLogin((prevState) => !prevState);
  };

 const authCtx = useContext(AuthContext);

  const submitHandler = (event: any) => {
    event.preventDefault();

    const enteredEmail = emailRef!.current!.value;
    const enteredPassword = passwordRef!.current!.value;

    let url;

    if (!isLoggedIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuTV3CvykmlilqYWHzhMgBn6nll5ZvEVw";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuTV3CvykmlilqYWHzhMgBn6nll5ZvEVw";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errMsg = 'no one loves you you are disgrace';
            
            throw new Error(errMsg);
          })
        }
      })
      .then((data) => {
        console.log(data);

        authCtx.login(data.idToken);
      })
      .catch((err) => {
       alert(err.message);
      });
  };

  return (
    <div className="container">
      <h1>{isLoggedIn ? "register" : "login"}</h1>
      <div className="register">
        <form onSubmit={submitHandler}>
          <label htmlFor="email">enter your email</label>
          <input
            type="email"
            id="email"
            required
            autoComplete="on"
            ref={emailRef}
          ></input>
          <label htmlFor="password">enter your pasword</label>
          <input
            type="password"
            id="password"
            required
            autoComplete="on"
            ref={passwordRef}
          ></input>
          <button>{isLoggedIn ? "register" : "login"}</button>
          <button onClick={switchAuthModeHandler} type="button">
            {!isLoggedIn ? "create account" : "login with acc"}
          </button>
        </form>

      </div>
      <div className="picture"></div>
    </div>
  );
};

export default Register;
