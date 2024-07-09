import React, { Component } from 'react'

export class Create extends Component {
  render() {
    return (
      <div className="create_form">
        <input  type = "text" placeholder='Enter Task' name = "" id = ""/>
        <button type = "button" >ADD</button>
      </div>
    )
  }
}

export default Create
