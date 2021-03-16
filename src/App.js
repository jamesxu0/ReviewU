import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AddReviewPage from "./pages/AddReviewPage/AddReviewPage";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";
import ClassPage from "./pages/ClassPage/ClassPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./App.scss";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseConfig from "./firebaseConfig";
import { useState, useContext, useEffect } from "react";
import Context from "./contexts/context";
import { ToastProvider, useToasts } from "react-toast-notifications";

const firebaseApp = firebase.initializeApp(firebaseConfig);

function App() {
  const { signOut } = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { addToast } = useToasts();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        if (!firebaseUser.email.endsWith("@umich.edu")) {
          signOut();
          addToast("You must login with a @umich.edu email", {
            appearance: "error",
          });
        } else {
          setIsLoggedIn(true);
          firebase
            .database()
            .ref("users/" + firebaseUser.uid)
            .once("value")
            .then(function (snapshot) {
              if (!snapshot.exists()) {
                firebase
                  .database()
                  .ref("users/" + firebaseUser.uid)
                  .set({
                    name: firebaseUser.displayName,
                  });
              }
            });
        }
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/class/:name" component={ClassPage} />
          <Route path="/account" component={MyAccountPage} />
          <Route path="/add" component={AddReviewPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

function AppContainer({ signInWithGoogle, signOut, user, loading }) {
  return (
    <div className="App">
      <Context.Provider
        value={{
          user,
          signInWithGoogle,
          signOut,
        }}
      >
        <ToastProvider
          autoDismiss={true}
          autoDismissTimeout={5000}
          placement="top-center"
        >
          <App />
        </ToastProvider>
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
})(AppContainer);
