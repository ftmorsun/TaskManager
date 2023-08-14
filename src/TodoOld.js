import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import './App.css';

const TodoOld = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      { text: task, description: "", completed: false },
    ]);
    setTask("");
  };

  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      return updatedTasks;
    });
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <div>
      <br />
      <br />
      <div className="childOne">
        <input
          type="text"
          value={task}
          placeholder="Add a task"
          onChange={(event) => setTask(event.target.value)}
        />
        <Button className="AddBtn" onClick={addTask}>
          <AddIcon />
        </Button>
        <br />
        <br />
        <ul className="textFont">
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
              />
              {task.text}
            </li>
          ))}
        </ul>
      </div>
      <br />
      <br />
      <div className="childTwo">
        <Button className="delBtn" onClick={deleteAllTasks}>
          <DeleteIcon />
          Delete All
        </Button>
      </div>
    </div>
  );
};

export default TodoOld;
