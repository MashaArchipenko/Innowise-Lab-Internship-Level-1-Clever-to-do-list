import React from "react";
import { Form } from "react-bootstrap";

const SignIn = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <>
      <div className="form">
        {
          hasAccount? <span>Sign In</span> : <span>Sign On</span>
        }
        <Form>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              required
              onChange={(e=> setEmail(e.target.value))}
              placeholder="Enter email"
            />
            <p className="errorMsg">{emailError}</p>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={(e => setPassword(e.target.value))}
              placeholder="Password"
            />
            <p className="errorMsg">{passwordError}</p>
          </Form.Group>
          <div className="btnContainer"> 
          {hasAccount ? (
              <>
              <button className="button"  onClick={handleLogin}>Sign in</button>
              </>
          ): (
            <>
            <button onClick={handleSignUp} className="button">Sign On</button>
            </>
          )
          }
        </div>
        </Form>
      </div>
      <div className="changeBlock">
        <div className="textSignUp">
          {
            hasAccount ? (
          <>
          <p>Don't have account?</p>
          <span  className="button" onClick={()=>setHasAccount(!hasAccount)}>
            Sign Up
          </span>
          </>
            ): (
            <>
              <p>Sign in to your account</p>
              <span className="button" onClick={()=>setHasAccount(!hasAccount)}>Sign In</span>
            </>
            )
          }
          
        </div> 
      </div>
    </>
  );
};

export default SignIn;
