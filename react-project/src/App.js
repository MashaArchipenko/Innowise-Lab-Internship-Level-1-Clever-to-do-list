import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignOn from "./Components/SignOn";
import SignIn from "./Components/SignIn";
import fire from "./firebase";

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInput=()=>
  {
    setEmail('');
    setPasswordError('');
  }

  const clearErrors =()=>{
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
    }

    const handlerSignUp = () => {
      clearErrors();
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message);
              break;
            case "auth/weak-password":
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
        <Switch>
          <Route exact path="/" component={SignIn} 
          email={email} 
          setEmail={setEmail}
          password={password} 
          setPassword={setPassword} 
          handleLogin={handleLogin} 
          handlerSignUp={handlerSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          />
          <Route exact path="/signOn" component={SignOn} handleLogout={handleLogout}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
