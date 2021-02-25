import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form} from "react-bootstrap";

export default class SignOn extends Component
{
    render()
    {
        return(
            <>
            <div className="form">
            <span>Sign On</span>
        <Form>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" />
            </Form.Group>
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
                <p>Sign in to your account</p>
                <Link to="/" className="button">Sign In</Link>
                </div>
            </div>
            
            </>
        );
    }
}