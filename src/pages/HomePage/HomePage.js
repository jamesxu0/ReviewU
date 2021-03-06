import React from "react";
import "./HomePage.scss";

function HomePage({ history, user, signOut }) {
  return (
    <div>
      Hello {user?.displayName}
      <p>
        <button onClick={signOut}>Log Out</button>
      </p>
    </div>
  );
}

export default HomePage;
