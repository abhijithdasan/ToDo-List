import React, { useState } from 'react';
import axios from 'axios';

function Create({ setTodos }) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    axios.post('http://localhost:3001/add', { task })
      .then(result => {
        setTodos(prevTodos => [...prevTodos, result.data]); // Update todos state with new task
        setTask(''); // Clear input field after adding task
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="create_form">
      <input 
        type="text" 
        placeholder="Enter Task" 
        value={task}
        onChange={(e) => setTask(e.target.value)} 
      />
      <button type="button" onClick={handleAdd}>ADD</button>
    </div>
  );
}

export default Create;
