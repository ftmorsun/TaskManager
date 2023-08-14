import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Todo = () => {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [name, setName] = useState('');
  const [tdesc, setDesc] = useState('');
  const [todos, setTodos] = useState([]);
  const [hideContent, setHideContent] = useState(false);

  const clickHandle = (e) => {
    e.preventDefault();
    const todo = { name, tdesc };
    console.log(todo);
    fetch('http://localhost:8080/todo/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log('New Task Added');
    });
  };

  const hideHandle = () => {
    setHideContent(true); // Set hideContent to true to hide content
  };

  const displayHandle = () => {
    setHideContent(false); 
    fetch('http://localhost:8080/todo/getAll')
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  useEffect(() => {
    displayHandle(); // Fetch tasks when the component mounts
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Add Task</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Task name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Task detail"
            variant="outlined"
            fullWidth
            value={tdesc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Button variant="contained" onClick={clickHandle}>
            Add Task
          </Button>
          <Button variant="contained" onClick={displayHandle}>
            Show Tasks
          </Button>
          <Button variant="contained" onClick={hideHandle}>
            Hide Tasks
          </Button>
        </Box>
      </Paper>

      
Certainly, I see a small typo in your code. The closing parenthesis for the todos.map function is misplaced. Here's the corrected version:

jsx
Copy code
{hideContent ? null : (
  <div>
    <h1>All Tasks</h1>
    <Paper elevation={3} style={paperStyle}>
      {todos.map((todo) => (
        <Paper
          elevation={3}
          style={{ padding: '15px', textAlign: 'center', margin: '10px' }}
          key={todo.id}
        >
          Task: {todo.name} <br />
          Description: {todo.tdesc} <br />
        </Paper>
      ))}
    </Paper>
  </div>
)}
    </Container>
  );
};

export default Todo;
