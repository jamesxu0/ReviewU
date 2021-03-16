import React from "react";
import "./LoginPage.scss";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "./../../contexts/context";

function LoginPage() {
  const history = useHistory();
  const { user, signInWithGoogle } = useContext(Context);
  if (user) {
    history.push("/");
  }
  return (
    <div className="loginContainer">
      <h2 className="title">Please sign in with a @umich.edu email</h2>
      <div className="loginButton" onClick={signInWithGoogle}>
        <FaGoogle size={32} />
        <p className="buttonText">Sign in with Google</p>
      </div>
    </div>
  );
}

export default LoginPage;
