import React, { Component } from 'react'
import TaskCard from './TaskCard'
import Form from './Form';
import axios from 'axios';

export default class TaskContainer extends Component {
  state = {
    tasks: [],
    task: {
      title: '',
      body: '',
    },



  }

  componentDidMount = () => {
    axios.get("http://localhost:5000/task")
      .then((tasks) => {
        console.log(tasks.data)
        this.setState({
          tasks: tasks.data
        })

      })
  }
  onChangeTitle = (e) => {
    console.log(e.target.value)
    this.setState({
      task: {
        title: e.target.value,
        body: this.state.task.body
      }
    })
  }
  onChangeBody = (e) => {
    this.setState({
      task: {
        title: this.state.task.title,
        body: e.target.value,
      }
    })
    console.log(e.target.value)
  }
  onSubmitForm = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/task", {
      title: this.state.task.title,
      body: this.state.task.body,
    })
      .then(() => {
        axios.get("http://localhost:5000/task")
          .then((tasks) => {
            console.log(tasks.data)
            this.setState({
              tasks: tasks.data
            })
          })
      })
    // console.log("body", this.state.task.body)
    // console.log("title", this.state.task.title)
  }
  deleteTask = (id) => {
    axios.delete(`http://localhost:5000/task/${id}`, { body: id })
      .then(() => {

        this.setState({
          tasks: this.state.tasks.filter(function (task) {
            return task._id !== id;
          })
        })
        

      }) // change for array element pop
  }

  render() {
    return (
      <div>
        <Form onSubmitForm={this.onSubmitForm} onChangeTitle={this.onChangeTitle} onChangeBody={this.onChangeBody}>Create</Form>
        {this.state.tasks.map((task) => {
          return <TaskCard title={task.title} body={task.body} onClickDelete={() => this.deleteTask(task._id)} id={task._id}></TaskCard>
        })}

      </div>
    )
  }
}
