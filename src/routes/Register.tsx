import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
import "./Register.scss";

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoggedIn, setLogin] = useState(false);

  const switchAuthModeHandler = () => {
    setLogin((prevState) => !prevState);
  };

  const authCtx = useContext(AuthContext);

  const loginConfirm = () => {
    const popUp = document.querySelector('.logo__popup');

    const markup = `
      <div class="logo__modal">
        <p class="logo__popTxt">Welcome!</p>
        <a href="/">let's start cooking</a>
      </div>
    `
    popUp!.innerHTML = markup;
  }

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
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errMsg = "no one loves you you are disgrace";

            throw new Error(errMsg);
          });
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
      <div className="register">
        <h1 className="register__header">
          {isLoggedIn ? "register" : "login"}
        </h1>
        <form onSubmit={submitHandler} className="register__form">
          <label htmlFor="email" className="register__label">
            enter your email
          </label>
          <input
            className="register__input"
            type="email"
            id="email"
            required
            autoComplete="on"
            ref={emailRef}
          ></input>
          <label htmlFor="password" className="register__label">
            enter your pasword
          </label>
          <input
            className="register__input"
            type="password"
            id="password"
            required
            autoComplete="on"
            ref={passwordRef}
          ></input>
          <button className="register__btn" onClick={loginConfirm}>
           {isLoggedIn ? "register" : "login"} 
          </button>
        
          <button
            className="register__btn register__btn--switch"
            onClick={switchAuthModeHandler}
            type="button"
          >
            {!isLoggedIn ? "Create an account" : "I have an account"}
          </button>
        </form>
        {/* {isLoggedIn && <Link to='/'>Lets cook</Link>} */}
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
        <p className="logo__picAuthor">Photo by <a href="https://unsplash.com/@jimmydean?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jimmy Dean</a> on Unsplash</p>
      </div>
    </div>
  );
};

export default Register;
