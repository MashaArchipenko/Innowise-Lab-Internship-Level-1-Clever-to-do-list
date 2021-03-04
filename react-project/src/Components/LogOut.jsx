import React from "react";
import fire from "../fire";

const LogOut = ({ handleLogout }) => {
  /*not use this function, only for my check
    not forget to delete after all */
  /*const getName = () => {
    let id = fire.auth().currentUser.uid;
    return fire
      .database()
      .ref("/users/" + id)
      .once("value")
      .then((res) => {
        console.log(res.val().username);
      })
      .catch((e) => console.log(e));
  };*/

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
