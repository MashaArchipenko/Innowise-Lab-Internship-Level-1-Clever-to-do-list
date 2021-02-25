import React,{Component} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom"
import SignOn from './SignOn'
import SignIn from './SignIn'

export default class Action extends Component
{
    render()
    {
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route exact path="/signOn" component={SignOn} />
                </Switch>
            
</Router>
        );
    }
}

