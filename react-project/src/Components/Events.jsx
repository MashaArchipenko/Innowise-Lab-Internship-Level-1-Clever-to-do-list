import React, { useState } from "react";
import fire from "../fire";
import NewTask from "./NewTask";
import UpdateTask from './UpdateTask'

const Events = ({ selectedDate }) => {
  const db = fire.database();
  const id = fire.auth().currentUser.uid;

  const getEvents = () => {
    let array=[];
    var eventsRef = db.ref("users/" + id + "/dates");
    eventsRef.on("value", (res) => {
      array.push(res.val());
    });
    console.log("arr",array);
    return array[0];
  };

  const [updateId,setUpdateId] = useState(null);
  const [todos,setTodos] = useState(()=>
  {
    console.log(getEvents())
    return getEvents();
  })

  const generateToDoList = () => {
    let value = [];
    console.log("todos ",todos);
    if (todos != null) {
      todos.forEach((i) => {
        if (selectedDate === i.dates) {
          console.log("i ", i);
          i.done === true
            ? value.push(
                <div >
                  <input
                    type="checkbox"
                    id={i.id}
                    onChange={changeStatus}
                    value={i.done}
                    key={i.done}
                    readOnly
                    checked
                  />
                  <label
                    key={i.name}
                    id={i.id}
                    onClick={setUpdateValue}
                    className="nameTsk"
                  >
                    {i.name}
                  </label>
                </div>
              )
            : value.push(
                <div>
                  <input
                    type="checkbox"
                    id={i.id}
                    onChange={changeStatus}
                    value={i.done}
                    key={i.done}
                  />
                  <label
                    key={i.name}
                    id={i.id}
                    onClick={setUpdateValue}
                    className="nameTsk"
                  >
                    {i.name}
                  </label>
                </div>
              );
        } else {
          console.log("not");
        }
      });
    }
    return <div>{value}</div>;
  };

  const setUpdateValue=(event)=>
  {
    setUpdateId(event.target.id);
  }

  const changeStatus = (event) => {
    const flag = Boolean(event.target.value);
    console.log(flag);
    db.ref("users/" + id + "/dates/" + event.target.id)
      .update({ id: event.target.id, dates: selectedDate, done: flag })
      .then(console.log("created"))
      .then((event.target.value = flag));
  };

  const generateBlock = () =>
  {
    if(updateId==null)
    {
      return  <NewTask selectedDate={selectedDate} todos={todos} />
    }
    else return <UpdateTask todos={todos} updateId={updateId} setUpdateId={setUpdateId}/>
  }

  return (
    <>
      <div className="events">
        <div className="todoList">{generateToDoList()}</div>
       {generateBlock()}
      </div>
    </>
  );
};

export default Events;
