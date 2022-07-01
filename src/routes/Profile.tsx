import { useState } from "react";
import { Link } from "react-router-dom";

import "./Profile.scss";

const Profile = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  console.log(localStorage.token);
  console.log(newPassword);
  const tokenId = window.localStorage.getItem("token");
  const submitReset = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDuTV3CvykmlilqYWHzhMgBn6nll5ZvEVw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: tokenId,
          password: newPassword,
          returnSecureToken: true as boolean,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log(res, "working");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errMsg = "not working";
            console.log(data);

            throw new Error(errMsg);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  console.log(password);
  return (
    <>
      <nav className="profile__nav">
        <a href="/">
          <h1>Bellycious</h1>
        </a>
      </nav>
      <div className="profile">
        <div className="profile__list">
          <Link to="/profile">account</Link>
        </div>
        <div className="profile__view">
          <form className="profile__form" onSubmit={submitReset}>
            <h1 className="profile__header">Reset Password</h1>
            <label htmlFor="email" className="register__label">
              Enter email
            </label>
            <input
              className="profile__input"
              type="email"
              id="email"
              required
              autoComplete="on"
            ></input>
            <label htmlFor="password" className="profile__label">
              Old pasword
            </label>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="profile__input"
              type="password"
              id="password"
              required
              autoComplete="on"
            ></input>
            <label htmlFor="password" className="profile__label">
              New pasword
            </label>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
              className="profile__input"
              type="password"
              id="password"
              required
              autoComplete="on"
            ></input>
            <button disabled={password.length < 6} className="profile__btn">
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
