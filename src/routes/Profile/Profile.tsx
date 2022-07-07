import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Profile.scss";

const Profile = () => {
  const [newPassword, setNewPassword] = useState("");
  const [ress, setRess] = useState(false);

  console.log(localStorage.token);
  console.log(newPassword);
  const tokenId = window.localStorage.getItem("token");
  const submitReset = (event: React.SyntheticEvent) => {
    event.preventDefault();
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
        console.log(res, "working");
        setRess(true);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errMsg =
              "something went wrong! check email, old password and try again.";

            throw new Error(errMsg);
          });
        }
      })
      .then((data) => {})
      .catch((err) => {
        alert(err.message);
      });
  };

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
            {ress && <p>Password Changed!</p>}
            <h1 className="profile__header">Reset Password</h1>
            <label htmlFor="email" className="register__label" aria-label="label">
              Enter email
            </label>
            <input
              className="profile__input"
              type="email"
              aria-label="input"
              required
              autoComplete="on"
            ></input>
            <label htmlFor="password" className="profile__label" aria-label="label">
              New password
            </label>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
              className="profile__input"
              type="password"
              aria-label="input"
              id="password"
              required
              autoComplete="on"
            ></input>
            <button disabled={newPassword.length < 6} className="profile__btn">
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
