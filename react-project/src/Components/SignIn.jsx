import React from "react";
import { Form } from "react-bootstrap";
import {Link} from 'react-router-dom';

const SignIn = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    emailError,
    passwordError,
  } = props;

  return (
    <>
      <div className="form">
      <span>Sign In</span>
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
            <button className="button"  onClick={handleLogin}>Sign in</button>
        </div>
        </Form>
      </div>
      <div className="changeBlock">
        <div className="textSignUp">
          <p>Don't have account?</p>
          <Link to="/signOn" className="button"> Sign On</Link>
        </div> 
      </div>
    </>
  );
};

export default SignIn;
