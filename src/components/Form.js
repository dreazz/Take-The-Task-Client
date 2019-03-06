import React, { Component } from 'react'
import axios from 'axios'

export default class Form extends Component {
  
  _input: ?HTMLInputElement;

  componentDidMount(prevProps, prevState) {
    this._input.focus();
  }


  render() {
    return (
      <div className="form">
        <form onSubmit={this.props.onSubmitForm}>
          <i className="fas fa-2x fa-chevron-circle-left btn btn-close" onClick={this.props.onClick}></i>
          <label for="title">Title</label>
          <input type="text" name="title" value={this.props.valueTitle} onChange={this.props.onChangeTitle} required  ref={c => (this._input = c)}/>
          <label for="body">Description</label>
          <textarea className="text-area"type="text"input name="body" value={this.props.valueBody} onChange={this.props.onChangeBody} required></textarea>
          <button className="btn btn-submit" type="submit" value="Create">{this.props.children}</button>
        </form>
      </div>
    )
  }
}
