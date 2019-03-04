import React, { Component } from 'react'
import Form from './Form'
import axios from 'axios';
import { runInThisContext } from 'vm';
import TaskProvider from '../lib/task-provider'

export default class TaskCard extends Component {
  
  render() {
    return (
      <div className="card">
        <h1>{this.props.title}</h1>
        <p>{this.props.body}</p>
        <div className="button-container">
        <button className="btn btn-delete" onClick={this.props.onClickDelete}>Delete</button>
        <button className="btn btn-edit" onClick={this.props.showEditForm}>Edit</button>
        </div>
      </div>
    )
  }
}
