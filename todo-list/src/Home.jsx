/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill } from 'react-icons/bs';

export default function Home() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend
  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const handleEdit = (id) => {
    axios.put('http://local:3001/update/'+id)
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

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
                <BsCircleFill className='iocn'/>
                <p>{todo.task}</p>
              </div>
              <div>
                <span><BsFillTrashFill className ='icon' /></span>
              </div>
            </div>
          ))
        )
      }
    </div>
  );
}
