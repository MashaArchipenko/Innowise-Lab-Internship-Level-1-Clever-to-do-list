import React from "react";
import { Form } from "react-bootstrap";
import {Link} from "react-router-dom";
import '../style/signInSignOn.css'

const SignOn = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSignUp,
    emailError,
    passwordError,
    name,
    setName
  } = props;

  return (
    <>
      <div className="form">
        <span>Sign On</span>
        <Form>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <p className="errorMsg">{passwordError}</p>
          </Form.Group>
          <div className="btnContainer">
            <button onClick={handleSignUp} className="button">
              Sign On
            </button>
          </div>
        </Form>
      </div>
      <div className="changeBlock">
        <div className="textSignUp">
          <p>Sign in to your account</p>
          <Link to="/" className="button">
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignOn;
