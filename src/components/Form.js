import React, { Component } from 'react'
import axios from 'axios'

export default class Form extends Component {
 

  render() {
    return (
      <div className="form">
        <form onSubmit={this.props.onSubmitForm}>
          <button onClick={this.props.onClick}>x</button>
          <input type="text" name="title" value={this.props.valueTitle} onChange={this.props.onChangeTitle}  />
          <input type="text" name="body" value={this.props.valueBody} onChange={this.props.onChangeBody} />
          <button type="submit" value="Create">{this.props.children}</button>
        </form>
      </div>
    )
  }
}
