import React, { useState } from "react";
import fire from "../fire";

function UpdateTask(props) {
  const { todos, updateId, setUpdateId } = props;
  const db = fire.database();
  const id = fire.auth().currentUser.uid;
  const getName =()=>
  {
      todos.forEach((i) => {
        console.log("id: ",i.id ,"updId: ",updateId)
        console.log(i.id == updateId)
        console.log(i.event)
      if (i.id == updateId) return i.event;
    });
  }

  const [updateTask, setUpdateTask] = useState(() => getName());
  const [updateName, setUpdateName] = useState(() => {
    todos.forEach((i) => {
      if (i.id == updateId) return i.name;
    });
  });

  const clearInput = () => {
    setUpdateName("");
    setUpdateTask("");
  };

  const saveChange = () => {
    db.ref("users/" + id + "/dates/" + updateId)
      .update({ event: updateTask, name: updateName })
      .then(console.log("update"))
      .then(setUpdateId(null))
      .then(clearInput());
  };

  return (
    <>
      <div className="addEvn">
        <label>Enter name of task</label>
        <input
          type="text"
          className="nameOfTask"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
          placeholder="Enter name of task"
        />
        <label>Enter task</label>
        <textarea
          type="text"
          placeholder="Enter task"
          value={updateTask}
          onChange={(e) => setUpdateTask(e.target.value)}
        />
        <button onClick={saveChange} className="addTask">
          Update task
        </button>
      </div>
    </>
  );
}

export default UpdateTask;
