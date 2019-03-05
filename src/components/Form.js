import React, { Component } from 'react'
import axios from 'axios'

export default class Form extends Component {
 

  render() {
    return (
      <div className="form">
        <form onSubmit={this.props.onSubmitForm}>
          <i className="btn btn-close" onClick={this.props.onClick}>x</i>
          <input type="text" name="title" value={this.props.valueTitle} onChange={this.props.onChangeTitle}  />
          <input className="text-area"type="text"input name="body" value={this.props.valueBody} onChange={this.props.onChangeBody} />
          <button className="btn" type="submit" value="Create">{this.props.children}</button>
        </form>
      </div>
    )
  }
}
