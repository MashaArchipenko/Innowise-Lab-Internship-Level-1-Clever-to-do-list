import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form} from "react-bootstrap";

export default class SignIn extends Component {

render() {
    return (
    <>
        <div className="form">
            <span>Sign In</span>
        <Form>
            <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <button className="button">
            Submit
            </button>
        </Form>
        </div>
        <div className="changeBlock">
        <div className="textSignUp">
            <p>Don't have account?</p>
            <Link to="/signOn" className="button">
            Sign Up
            </Link>
        </div>
        </div>
    </>
    );
}
}
