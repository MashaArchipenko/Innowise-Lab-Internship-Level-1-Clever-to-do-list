import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import LogOut from "./Components/LogOut";
import fire from "./fire";
import SignOn from './Components/SignOn';
import SignIn from './Components/SignIn';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  const checkConnectDb=()=>
{
  const db=fire.database();
  const name=db.ref('name');
  name.on('value',(elem)=>console.log(elem.val()));
}

checkConnectDb();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  var defaultAuth=fire.auth();

  const clearInput = () => {
    setEmail("");
    setPasswordError("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = (event) => {
    clearErrors();
    event.preventDefault();
    defaultAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => 
      {
        setUser(result.user);
        console.log(user,result.user);
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
    defaultAuth
      .createUserWithEmailAndPassword(email, password)
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
    defaultAuth.signOut();
  };

  const authListener = () => {
    defaultAuth.onAuthStateChanged((user) => {
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
  },[]);

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
