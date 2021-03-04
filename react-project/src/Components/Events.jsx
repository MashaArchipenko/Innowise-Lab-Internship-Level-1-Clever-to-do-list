import React, { useState } from "react";
import fire from "../fire";

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
    });
  };

  const clearInput = () => {
    setTask("");
  };

  /*same error*/
  const createEvent = (event) => {
    clearInput();
    event.preventDefault();
    let ar=[];
    console.log("sel date",selectedDate);
    const countEvents = db.ref("users/" + id + "/dates");
    countEvents.once("value").then((snapshot) => {
      //let count = 0;
      ar.push(snapshot.val())//() == null ? count= 0 : snapshot.val().forEach(() => count++);
     // console.log("coun",count);setEventCount(count);console.log("eventc",eventCount);
    });
    let count=0;console.dir(ar[0])
    if(ar[0]!==undefined) count=ar[0].length(); ///undefined
    console.log("count",count)
    db
      .ref("users/" + id + "/dates/" + eventCount)
      .set({ id: eventCount, dates: selectedDate, done: "false", event: task })
      .then(console.log("created",eventCount))
      .catch((e) => console.error(e.message));
  };

  const generateToDoList = () => {
    getEventsCount();
    let value = [];
    if (array[0] != null) {
      array[0].forEach((i) => {
        if (selectedDate === i.dates) {
          console.log("i ",i);
          i.done == true
            ? value.push(
                <div>
                  <input
                    type="checkbox"
                    name={i.id}
                    onChange={changeStatus}
                    value={i.done}
                    key={i.done}
                    readOnly
                    checked
                  />
                  <label key={i.event}>{i.event}</label>
                </div>
              )
            : value.push(
                <div>
                  <input
                    type="checkbox"
                    name={i.id}
                    onChange={changeStatus}
                    value={i.done}
                    key={i.done}
                  />
                  <label key={i.event}>{i.event}</label>
                </div>
              );
        } else {
          console.log("not");
        }
      });
    }
    return <div>{value}</div>;
  };

  const changeStatus = (event) => {
    const flag=Boolean(event.target.value);
    console.dir(event.target.name);
    console.log(flag);
    db.ref("users/" + id + "/dates/" + event.target.name)
      .update({id:event.target.name, dates: selectedDate, done: flag})
      .then(console.log("created")).then(event.target.value=flag);
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
