import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import LogOut from "./Components/LogOut";
import fire from "./fire";
import SignOn from './Components/SignOn';
import Action from './Components/Action.jsx';
import SignIn from './Components/SignIn';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [name, setName] = useState("");


  const clearInput = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = (event) => {
    clearErrors();
    event.preventDefault();
    fire.auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        alert(result);
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/invalid-password":
            setPasswordError(err.message);
            break;
          default: alert(err.message);
        }
      });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    clearErrors();
    fire.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((currentUser) => {
        currentUser.user.updateProfile({ displayName: name });
        fire.database().ref('users/' + currentUser.user.uid).set(
          {
            username: name,
            email: email
          }
        );
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-exists':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/invalid-password':
            setPasswordError(err.message);
            break;
          default: alert(err.message)
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
        setName(user.displayName)
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <Router>
        {
          user ? (
            <>
              <LogOut handleLogout={handleLogout} />
              <Action />
            </>
          ) :
            (
              <>
                <Header />
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
                      name={name}
                      setName={setName}
                    />
                  </Route>
                </Switch>
              </>
            )
        }
      </Router>
    </>
  );
}

export default App;
