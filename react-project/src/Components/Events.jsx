import React, { useState } from 'react';
import fire from '../fire';
import NewTask from './NewTask';
import UpdateTask from './UpdateTask';
import '../style/events.css'

const Events = (props) => {
  const {todos,setTodos, selectedDate, updateId, setUpdateId } = props;

  const db = fire.database();
  const id = fire.auth().currentUser.uid;

  const getName = (upid) => {
    todos.forEach((i) => {
      if (i.id == upid) {
        setUpdateName(i.name);
      }
    });
  };

  const getTask = (upid) => {
    todos.forEach((i) => {
      if (i.id == upid) setUpdateTask(i.event);
    });
  };

  const [updateTask, setUpdateTask] = useState("");
  const [updateName, setUpdateName] = useState("");

  const generateToDoList = () => {
    let value = [];
    if (todos != null) {
      todos.forEach((i) => {
        if (selectedDate === i.dates) {
          i.done === true
            ? value.push(
                <div>
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
        }
      });
    }
    return <div>{value}</div>;
  };

  const setUpdateValue = (event) => {
    getTask(event.target.id);
    getName(event.target.id);
    setUpdateId(event.target.id);
  };

  const changeStatus = (event) => {
    const flag = Boolean(event.target.value);
    db.ref("users/" + id + "/dates/" + event.target.id)
      .update({ id: event.target.id, dates: selectedDate, done: flag })
      .then((event.target.value = flag));
  };

  const clearInput = () => {
    setUpdateName("");
    setUpdateTask("");
  };

  function getEvents() {
    let array = [];
    var eventsRef = db.ref("users/" + id + "/dates");
    eventsRef.on("value", (res) => {
      array.push(res.val());
      setTodos(res.val())
    });
    //setTodos(array[0])
  }

  const saveChange = () => {
    //update task
    db.ref("users/" + id + "/dates/" + updateId)
      .update({ event: updateTask, name: updateName })
      .then(setUpdateId(null))
      .then(clearInput())
      .then(getEvents());
  };

  const generateBlock = () => {
    if (updateId == null) {
      return (
        <NewTask
          selectedDate={selectedDate}
          todos={todos}
          setTodos={setTodos}
        />
      );
    } else
      return (
        <UpdateTask
          updateName={updateName}
          setUpdateName={setUpdateName}
          updateTask={updateTask}
          setUpdateTask={setUpdateTask}
          saveChange={saveChange}
        />
      );
  };

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
