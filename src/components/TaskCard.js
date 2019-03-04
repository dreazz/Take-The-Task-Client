import React, { Component } from 'react'
import Form from './Form'
import axios from 'axios';
import { runInThisContext } from 'vm';

export default class TaskCard extends Component {
  state = {
    task_id: this.props.id,
    taskTitle: "",
    taskBody: "",
    edit: false,
    deleted:"",

  }
 
  showEditForm = (e) => {

    if (this.state.edit === false) {
      //show edit form
      this.setState({
        edit: true
      })
    } else {
      //close edit form
      this.setState({
        edit: false
      })
    }
  }

  handleChangeTitle = (e) => {
    this.setState({
      taskTitle: e.target.value
    })
  }

  handleChangeBody = (e) => {
    this.setState({
      taskBody: e.target.value
    })
  }
  editTask = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/task/${this.state.task_id}`, {
      title: this.state.taskTitle,
      body: this.state.taskBody
    })
  }


  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.body}</p>
        <button onClick={this.props.onClickDelete}>Delete</button>
        <button onClick={this.showEditForm}>Edit</button>
        {(this.state.edit) ? <Form onSubmitForm={this.editTask} edit={this.state.edit} onChangeTitle={this.handleChangeTitle} onChangeBody={this.handleChangeBody}>Edit</Form> : false}

      </div>
    )
  }
}
