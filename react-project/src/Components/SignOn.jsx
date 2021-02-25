import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SignOn extends Component
{
    render()
    {
        return(
            <><div className="signOnForm">
            </div>
            <div className="notSignUpBlock">
                <div className="textSignUp">
                <p>Войдите в аккаунт</p>
                <Link to="/">Sign In</Link>
                </div>
            </div>
            
            </>
        );
    }
}