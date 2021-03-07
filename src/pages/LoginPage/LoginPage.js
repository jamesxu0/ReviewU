import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Context from "./../../contexts/context";

function LoginPage() {
  const history = useHistory();
  const { user, signInWithGoogle } = useContext(Context);
  if (user) {
    console.log(history);
    history.push("/");
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </header>
    </div>
  );
}

export default LoginPage;
