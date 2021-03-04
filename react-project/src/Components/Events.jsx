import React, { useState} from "react";
import fire from "../fire";
import { isEqual } from "date-fns";

const Events = ({ selectedDate }) => {
  const [task, setTask] = useState("");
  const [eventCount, setEventCount] = useState(0);

  const db = fire.database();
  const id = fire.auth().currentUser.uid;

  let array = [];
  const getEventsCount = () => {
    var eventsRef = db.ref("users/" + id + "/dates");
    eventsRef.on("value", (res) => {
      array.push(res.val());
      console.log(res.val());
    });
    console.dir("array ", array);
  };

  const clearInput = () => {
    setTask("");
  };

  const createEvent = (event) => {
    clearInput();
    event.preventDefault();
    const countEvents = fire.database().ref("users/" + id + "/dates");
    countEvents.once("value").then((snapshot) => {
      let count = 0;
      snapshot.forEach(() => count++);
      setEventCount(count);
    });
    console.dir("event count", eventCount)
    fire
      .database()
      .ref("users/" + id + "/dates/" + eventCount)
      .set({ dates: selectedDate, done: "false", event: task })
      .then(console.log("created"))
      .catch((e) => console.error(e.message));
    setEventCount(Number(eventCount) + 1);
  };

  const generateToDoList = () => {
    getEventsCount();
    let events = [];
    let done = [];
    let value=[];
    console.dir(array[0]);
    if (array[0] != null) {
      array.forEach((i) => {
        console.log(i);
        console.log("selD and iDat: "+selectedDate,i.dates)
        if (selectedDate == i.dates) {
          console.log("equal");
          console.log("i.event"+i.event)
          events.push(i.event);
          done.push(i.done);
          value.push(
            <div>
            {i.done ? <input type="checkbox" name="doneVal" value={i.done} checked />: <input type="checkbox" name="doneVal" value={i.done} />} 
            <label for="subscribeNews">{i.event}</label>
            </div>
            );
        } else console.log("not");
      });
    }
    console.log(value)
    return <div>{value}</div>;
  };

  return (
    <>
      <div className="events">
        <div className="todoList">{generateToDoList()}</div>
        <div className="addEvn">
          <textarea
            type="text"
            name="newTask"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            id="newEvn"
            placeholder="Enter task"
          />
          <button onClick={createEvent} className="addTask">
            Add new task
          </button>
        </div>
      </div>
    </>
  );
};

export default Events;
