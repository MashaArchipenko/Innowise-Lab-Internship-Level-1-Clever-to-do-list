import React from 'react'
import Header from './Components/Header'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom"

import SignOn from './Components/SignOn'
import SignIn from './Components/SignIn'
//import firebase from 'firebase'

function App() 
{
  //console.dir(firebase.database)
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
