import React from "react";
import fire from "../fire";
import { isEqual } from "date-fns";
import { createEvent } from "@testing-library/react";

const Events = ({selectedDate}) => {
  const id = fire.auth().currentUser.uid;
  const db = fire.database();
  
  const getEvents = () => {
    let flag = false;
    var eventsRef = db.ref("users/" + id + "/dates/date");
    eventsRef.on("value", (res) => {
      console.dir(res.val());
      flag = isEqual(selectedDate, res.val());
      console.log(flag);
    });
  };

  const createEvent = () => {
    fire.database().ref('users/' + id+"/dates/date").set({
        dateSel:{selectedDate},
        done:"false",
        event:"create a task"
      }).then(alert("Succes!")).catch((e)=>console.log(e.message))
  };

  const generateToDoList = () => {};

  return (
    <>
      <div className="events">
        <div className="todoList">{getEvents()}</div>
        <button onClick={createEvent()} className="addTask">
          Add new task
        </button>
      </div>
    </>
  );
};

export default Events;
