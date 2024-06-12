import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faL, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToDo = () => {
  const date = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = daysOfWeek[date.getDay()];
  const [tasks, SetTask] = useState(() => {
    try {
      const localTask = localStorage.getItem("tasks");
      return localTask ? JSON.parse(localTask) : [];
    } catch (e) {
      console.error("Error parsing localStorage tasks", e);
      return [];
    }
  });

  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (tasks.some((tasks) => tasks.toLowerCase() == text.toLowerCase())) {
      const notify = () => toast.warning("Task already exist");
      notify();
      return;
    }
    if (isEditing) {
      console.log("hi");
      console.log(currentTaskIndex);
      const updatedTask = tasks.map((task, index) => {
        return index == currentTaskIndex ? text : task;
      });
      console.log(updatedTask);
      SetTask(updatedTask);
      localStorage.setItem("task", JSON.stringify(updatedTask));
      setIsEditing(false);
      setCurrentTaskIndex(null);
      return;
    } else {
      if (text.trim()) {
        const newTask = [...tasks, text];
        SetTask(newTask);
        localStorage.setItem("tasks", JSON.stringify(newTask));
        const notify = () => toast.success("Task added successFull");
        notify();
      } else {
        const notify = () => toast.error("Task is empty");
        notify();
        return;
      }

      setText("");
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setText(tasks[index]);
  };

  const handleDelete = (index) => {
    const deleteTask = tasks.filter((value, i) => {
      return i !== index;
    });
    const notify = () => toast.success("successFully Deleted");
    notify();
    SetTask(deleteTask);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="toDo">
      <div className="inputTodo">
        <ToastContainer />
        <h1>To-Do on {today}</h1>
        <div className="inputBox">
          <form onSubmit={handelSubmit}>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              placeholder="Enter your Task..."
            />

            <button className="add" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
     
      <ul className="TodoList">
        {tasks && tasks.length > 0 ? (
          tasks.map((task, index) => {
            return (
              <li key={index}>

                 <input className="check" type="checkbox"/>
                {task}
                <div className="buttons">
                  <button className="edit" onClick={() => handleEdit(index)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <li>no Task yet</li>
        )}
      </ul>
    </div>
  );
};

export default ToDo;
