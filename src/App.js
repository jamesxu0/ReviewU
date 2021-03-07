import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AddReviewPage from "./pages/AddReviewPage/AddReviewPage";
import ClassPage from "./pages/ClassPage/ClassPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./App.scss";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { useEffect } from "react";
import { useState } from "react";
import Context from "./contexts/context";

const firebaseApp = firebase.initializeApp(firebaseConfig);

function App({ signInWithGoogle, signOut, user, loading }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      console.log("auth change");
      if (firebaseUser) {
        setIsLoggedIn(true);
        // history.push("/");
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <Context.Provider
        value={{
          user,
          signInWithGoogle,
          signOut,
        }}
      >
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/class" component={ClassPage} />
            <Route path="/add" component={AddReviewPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        ) : (
          <LoginPage />
        )}
      </Context.Provider>
    </div>
  );
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
