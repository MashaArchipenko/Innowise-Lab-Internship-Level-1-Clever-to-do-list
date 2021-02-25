import React from 'react'
import Header from './Components/Header'
import Action from './Components/Action'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom"

import SignOn from './Components/SignOn'
import SignIn from './Components/SignIn'

function App() 
{
  return (
    <>
      <Router>
    <Header />
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route exact path="/signOn" component={SignOn} />
                </Switch>
            
</Router>
    </>
  );
}

export default App;
