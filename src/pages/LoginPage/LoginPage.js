import React from "react";

function LoginPage({ user, signOut, signInWithGoogle }) {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </header>
    </div>
  );
}

export default LoginPage;
