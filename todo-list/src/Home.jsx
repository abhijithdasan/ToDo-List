/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

export default function Home() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend
  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
      .then(() => {
        // Update the state to reflect the changes
        setTodos(prevTodos => prevTodos.map(todo => 
          todo._id === id ? { ...todo, done: true } : todo
        ));
      })
      .catch(err => console.error('Error updating todo:', err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        // Update the state to reflect the changes
        setTodos(prevTodos => prevTodos.filter(todo => 
          todo._id !== id));
      })
      .catch(err => console.error('Error deleting todo:', err));
  };

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
            <div className='task'> 
              <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                {todo.done ? 
                  <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                : 
                  <BsCircleFill className='icon'/>
                }
                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
              </div>
              <div>
                <span><BsFillTrashFill className ='icon' 
                onClick ={() => handleDelete(todo._id)}/></span>
              </div>
            </div>
          ))
        )
      }
    </div>
  );
}
