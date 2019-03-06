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
        <hr></hr>
        <p>{this.props.body}</p>
        <div className="button-container">
        <i className="fas fa-trash-alt fa-1x btn btn-delete" onClick={this.props.onClickDelete}></i>
        <i className="fas fa-pencil-alt fa-1x btn btn-edit" onClick={this.props.showEditForm}></i>
        <i className="fas fa-check-circle fa-1x btn btn-done" onClick={this.props.done}></i>
        
        </div>
      </div>
    )
  }
}
