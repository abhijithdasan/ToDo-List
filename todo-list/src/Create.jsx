// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'

export class Create extends Component {
  render() {
    return (
      <div className="create_form">
        <input  type = "text" placeholder='Enter Task' name = "" id = ""/>
        <button type = "button" onClick={handleAdd}>ADD</button>
      </div>
    )
  }
}

export default Create
