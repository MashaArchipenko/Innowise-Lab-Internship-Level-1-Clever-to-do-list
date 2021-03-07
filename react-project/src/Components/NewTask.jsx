import React, { useState } from "react";
import fire from "../fire";


function NewTask(props) {
  const { selectedDate,todos} = props;

  const db = fire.database();
  const id = fire.auth().currentUser.uid;

  const [task, setTask] = useState("");
  const [name, setName] = useState("");

  const [eventCount, setEventCount] = useState(()=>{
    if(todos==null) return 0;
    else return todos.length;
  })


  const clearInput = () => {
    setTask("");
    setName("");
  };

  const createTask = () => {
    clearInput();
    db.ref("users/" + id + "/dates/" + eventCount)
      .set({
        id: eventCount,
        dates: selectedDate,
        done: "false",
        event: task,
        name: name,
      }).then(setEventCount(pre=>pre+1))
      .catch((e) => console.error(e.message));
      
  };

  
  return (
    <>
      <div className="addEvn">
        <label>Enter name of task</label>
        <input
          type="text"
          className="nameOfTask"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name of task"
        />
        <label>Enter task</label>
        <textarea
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={createTask} className="addTask">
          Create task
        </button>
      </div>
    </>
  );
}

export default NewTask;
