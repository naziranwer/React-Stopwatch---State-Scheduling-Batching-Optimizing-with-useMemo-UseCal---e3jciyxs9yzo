import React, { useState } from "react";

export const SubComponent = () => {
  console.log("App Rerenders");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState({
    lists: [],
    status: [],
    editing: [],
  });

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const addTask = () => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      lists: [...prevTasks.lists, task],
      status: [...prevTasks.status, false],
      editing: [...prevTasks.editing, false],
    }));
    // setTask("");
  };

  const changeStatus = (index) => {
    console.log("status changed", index, tasks.status[index]);
    setTasks((prevTasks) => ({
      ...prevTasks,
      status: prevTasks.status.map((value, i) =>
        i === index ? !value : value
      ),
    }));
  };

  const editTask = (index) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      editing: prevTasks.editing.map((value, i) =>
        i === index ? !value : value
      ),
    }));
  };

  const saveTask = (index) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      lists: prevTasks.lists.map((item, i) => (i === index ? task : item)),
      editing: prevTasks.editing.map((value, i) =>
        i === index ? !value : value
      ),
    }));
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => ({
      lists: prevTasks.lists.filter((item, i) => i !== index),
      status: prevTasks.status.filter((item, i) => i !== index),
      editing: prevTasks.editing.filter((item, i) => i !== index),
    }));
  };

  return (
    <div
      className="inside-app"
      style={{ marginLeft: "100px", marginBottom: "10px" }}
    >
      <h3>Sub-List</h3>
      <div>
        <input
          type="text"
          // value={task}
          onChange={handleInputChange}
          placeholder="Enter task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {tasks.lists.length > 0 ? (
        <ul>
          {tasks.lists.map((item, index) => (
            <li key={index}>
              {!tasks.editing[index] ? (
                <>
                  <input
                    type="checkbox"
                    checked={tasks.status[index]}
                    onChange={() => changeStatus(index)}
                  />
                  {item}
                  <button onClick={() => editTask(index)}>Edit</button>
                  <button onClick={() => deleteTask(index)}>Delete</button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={task}
                    onChange={handleInputChange}
                    placeholder="Edit task..."
                  />
                  <button onClick={() => saveTask(index)}>Save</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Please Add Subtasks</p>
      )}
    </div>
  );
};

export default SubComponent;
