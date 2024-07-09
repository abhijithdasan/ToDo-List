/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import Create from './Create'
export default function Home() {
  const [todos, setTodos] = useState([])
  return (
    <div className='home'>
      <h2>ToDo List</h2>
      <Create />
      {
        todos.length == 0 
        ? 
        <div>
          <h2>No Record</h2> 
        </div> 
        :

        todos.map(todo => (
          <div>
            {todo}
          </div>
        ))
      }
    </div>
  )
}
