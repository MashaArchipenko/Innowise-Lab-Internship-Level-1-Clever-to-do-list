import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import LogOut from "./Components/LogOut";
import fire from "./fire";
import SignOn from './Components/SignOn';
import SignIn from './Components/SignIn';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInput = () => {
    setEmail("");
    setPasswordError("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let usr = userCredential.user;
        setUser(usr);
        console.log(userCredential);
        user = email;
        setUser(user);
      }).catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/invalid-password":
            setPasswordError(err.message);
            break;
          default: alert(err);
        }
      });
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-exists":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/invalid-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <>
    <Router>
      <Header />
      {
        user ? (<LogOut handleLogout={handleLogout} />):
          (
              <Switch>
                <Route exact path="/" component={SignIn}>
                  <SignIn
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    emailError={emailError}
                    passwordError={passwordError}
                  />
                </Route>
                <Route exact path="/signOn">
                  <SignOn
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleSignUp={handleSignUp}
                    emailError={emailError}
                    passwordError={passwordError}
                  />
                </Route>
              </Switch>
            
          )
      }
      </Router>
    </>
  );
}

export default App;
