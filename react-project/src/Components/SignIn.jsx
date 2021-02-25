import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class SignIn extends Component{
    render()
    {
        return(
            <div className="notSignUpBlock">
                <div className="textSignUp">
                <p>Don't have account?</p>
                <Link to="/signOn">Sign Up</Link>
                </div>
            </div>
        );
    }
}