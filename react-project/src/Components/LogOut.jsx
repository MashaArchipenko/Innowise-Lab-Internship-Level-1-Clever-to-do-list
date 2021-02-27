import React from 'react'

const LogOut = ({handleLogout}) =>

    {
        return(
            <>
            <p>Welcome</p>
            <button className="button" onClick={handleLogout}>Logout</button> 
            </>
        );
    }

    export default LogOut;