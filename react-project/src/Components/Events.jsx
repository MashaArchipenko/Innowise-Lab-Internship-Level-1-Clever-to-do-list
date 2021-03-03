import React, { useState, useEffect } from "react";
import fire from "../fire";
import { isEqual } from "date-fns";

const Events = ({ selectedDate }) => {
  const [task, setTask] = useState("");
  const [eventCount, setEventCount] = useState("");

  const id = fire.auth().currentUser.uid;
  const db = fire.database();

  const clearInput = () =>
  {
    setTask('');
  }

  const getEvents = () => {
    let array=[];

    var eventsRef = db.ref("users/" + id + "/dates");
    eventsRef.on("value", (res) => {
      array.push(res.val());
    });
    console.log(array)

    let events=[];
    let done=[];
    array.forEach((i)=>
    {
      isEqual(selectedDate,i.dates) ? console.log('equal') : console.log('not');
      events.push(i.event);
      done.push(i.done);
    })

    return <input type="checkbox">{events}</input>
  };

  getEvents();

  const createEvent = () => {
    
    const countEvents = fire.database().ref("users/" + id + "/dates");
    countEvents.once("value").then((snapshot) => {
      let count = 0;
      snapshot.forEach(() => count++);
      setEventCount(count);
    });

    fire
      .database()
      .ref("users/" + id + "/dates/" + Number(eventCount))
      .set({ dates: selectedDate, done: "false", event: task })
      .then(console.log("created"))
      .catch((e) => console.log(e.message));
  };

  const generateToDoList = () => {};

  return (
    <>
      <div className="events">
        <div className="todoList"></div>

        <div className="addEvn">
          <textarea
            type="text"
            name="newTask"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            id="newEvn"
            placeholder="Enter task"
          />
          <button onClick={createEvent()} className="addTask">
            Add new task
          </button>
        </div>
      </div>
    </>
  );
};

export default Events;
