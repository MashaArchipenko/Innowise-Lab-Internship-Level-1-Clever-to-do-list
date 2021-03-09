import React from "react";

function UpdateTask(props) {
  const { updateName, setUpdateName, updateTask, setUpdateTask,saveChange } = props;
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
