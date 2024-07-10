/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';

export default function Home() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend
  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  return (
    <div className='home'>
      <h2>ToDo List</h2>
      <Create setTodos={setTodos} /> {/* Pass setTodos to Create component */}
      {
        todos.length === 0 ? (
          <div>
            <h2>No Record</h2> 
          </div> 
        ) : (
          todos.map(todo => (
            <div key={todo._id}> {/* Use a unique key for each todo */}
              {todo.task}
            </div>
          ))
        )
      }
    </div>
  );
}
