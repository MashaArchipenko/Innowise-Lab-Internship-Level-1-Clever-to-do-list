import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import LogOut from "./Components/LogOut";
import SignIn from "./Components/SignIn";
import fire from "./fire";

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
    let a = fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let usr = userCredential.user;
      setUser(usr);
      console.log(userCredential);
    }).catch((err) => {
        // eslint-disable-next-line default-case
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
      console.dir(a);
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        // eslint-disable-next-line default-case
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      {
      user ? (
        <LogOut handleLogout={handleLogout} />
      ) : (
        <SignIn
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
    </>
  );
}

export default App;
