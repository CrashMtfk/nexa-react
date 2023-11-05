import React from "react";
import { useState } from "react";
import Logo from "../assets/logo_sign_login.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";
import { validateForm } from "../utils/validateRegister";

export default function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    playerName: "",
    username: "",
    password: "",
  });

  const registerUser = (event) => {
    if (
      validateForm(
        userData.username,
        userData.password,
        userData.playerName,
        event,
      )
    ) {
      axios
        .post("http://localhost:8080/api/auth/register", {
          playerName: userData.playerName,
          username: userData.username,
          password: userData.password,
        })
        .then((resp) => {
          const authenticatedUser = resp.data;
          localStorage.setItem("token", authenticatedUser.token);
          localStorage.setItem("userId", authenticatedUser.userId);
          navigate("/introduction");
        });
    }
  };

  return (
    <div className="register-root">
      <div className="register-container">
        <div className="left-side-register">
          <h2>
            I am excited to begin this
            <br />
            journey with you!
          </h2>
          <img src={Logo} alt="Nexa logo" />
          <h2>
            Let's start with making
            <br />
            an account.
          </h2>
        </div>
        <div className="right-side-register">
          <h1>Register</h1>
          <form action="" onSubmit={registerUser} className="form-register">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              name="username"
              id="username"
            />
            <label htmlFor="playerName">Player Name</label>
            <input
              type="text"
              onChange={(e) =>
                setUserData({ ...userData, playerName: e.target.value })
              }
              name="playerName"
              id="playerName"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              name="password"
              id="password"
            />
            <button type="submit" className="submit-register">
              Register
            </button>
          </form>
          <div className="error-message" id="error-message"></div>
          <p>
            Already registered?<Link to="/">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
