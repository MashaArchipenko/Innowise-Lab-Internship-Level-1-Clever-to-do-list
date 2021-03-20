import React from "react";
import fire from "../fire";

const LogOut = ({ handleLogout }) => {
  return (
    <header>
      Welcome {fire.auth().currentUser.displayName}
      <button className="button logout" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default LogOut;
