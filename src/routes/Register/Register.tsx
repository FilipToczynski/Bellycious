import React, { useContext, useRef, useState } from "react";

import AuthContext from "../../store/auth-context";
import "./Register.scss";

const Register: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoggedIn, setLogin] = useState(false);
  const [password, setPassword] = useState("" as string);
  const [newUser, setNewUser] = useState('' as string);
  const [registered, setRegistered] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    // toggle isLoggedIn state
    setLogin((prevState) => !prevState);

    //clear popUp
    const popUp = document.querySelector(".logo__popup") as HTMLDivElement;
    popUp!.innerHTML = "";

    //clear input
    emailRef.current!.value = "";
    passwordRef.current!.value = "";
    setPassword("");
  };

  const submitHandler = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();

    const enteredEmail = emailRef!.current!.value;
    const enteredPassword = passwordRef!.current!.value;

    let url;

    if (!isLoggedIn as boolean) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuTV3CvykmlilqYWHzhMgBn6nll5ZvEVw";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuTV3CvykmlilqYWHzhMgBn6nll5ZvEVw";
    }

    fetch(url as string, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail as string,
        password: enteredPassword as string,
        returnSecureToken: true as boolean,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errMsg =
              "something went wrong, check your password, email and try again";

            throw new Error(errMsg);
          });
        }
      })
      .then((data: { idToken: string, registered: boolean, kind: string }) => {
        setRegistered(data.registered);
        setNewUser(data.kind)
        authCtx.login(data.idToken);
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  
    const loginConfirm = () => {
      const popUp = document.querySelector(".logo__popup") as HTMLDivElement;
      const header = document!.querySelector(".register__header")!
        .innerHTML as string;

      const onLoginMessage = `
      <div class="logo__modal animate__animated animate__fadeIn">
      <p class="logo__popTxt">Welcome!</p>
      <a href="/">let's start cooking</a>
      </div>
      `;

      const onRegisterMessage = `
      <div class="logo__modal animate__animated animate__fadeIn">
      <p class="logo__popTxt">Thanks for registering! you can now <a href="/register">login</a></p>
      </div>
      `;
      
      if (header === "Login" && registered) {
        popUp!.innerHTML = onLoginMessage;
      } else if (header === "Register" && newUser) {
        popUp!.innerHTML = onRegisterMessage;
      }
    };
  

  setTimeout(loginConfirm, 1);

  return (
    <div className="container">
      <div className="register">
        <h1 className="register__header">
          {isLoggedIn ? "Register" : "Login"}
        </h1>
        <form onSubmit={submitHandler} className="register__form">
          <label htmlFor="email" className="register__label">
            Enter email
          </label>
          <input
            className="register__input"
            type="email"
            id="email"
            aria-label="input"
            required
            autoComplete="on"
            ref={emailRef}
          ></input>
          <label htmlFor="password" className="register__label">
            Enter password
          </label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="register__input"
            type="password"
            id="password"
            aria-label="input"
            required
            autoComplete="on"
            ref={passwordRef}
          ></input>
          <button
            className="register__btn"
            disabled={password.length < 6}
            onClick={loginConfirm}
            aria-label="button"
          >
            {isLoggedIn ? "Register" : "Login"}
          </button>

          <button
            className="register__btn register__btn--switch"
            onClick={switchAuthModeHandler}
            type="button"
          >
            {!isLoggedIn ? "Create an account" : "I have an account"}
          </button>
        </form>
      </div>
      <div className="logo">
        <p className="logo__popup"></p>
        <h1 className="logo__header">Bellycious</h1>
        <p className="logo__description">Search for 1,000,000 recipes!</p>
        <figure className="logo__img">
          <img
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="food"
          />
        </figure>
        <p className="logo__picAuthor">
          Photo by
          <a href="https://unsplash.com/@jimmydean?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Jimmy Dean
          </a>
          on Unsplash
        </p>
      </div>
    </div>
  );
};

export default Register;
