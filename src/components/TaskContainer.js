import React, { Component } from 'react'
import TaskCard from './TaskCard'
import Form from './Form';
import axios from 'axios';
import '../static/taskcontainer.css'

import { Bubble, Doughnut, Bar, crazyLine, HorizontalBar, Radar } from 'react-chartjs-2';


export default class TaskContainer extends Component {

  state = {
    tasks: [],
    task: {
      title: '',
      body: '',
      id: '',
      status: ''
    },
    create: false,
    edit: false,
    todoContainer: true,
    doneContainer: false,
    taskCard: {
      clicked: false,
    }

  }

  componentDidMount = () => {
    axios.get(process.env.REACT_APP_BASE_URL + "/task")
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
    axios.post(process.env.REACT_APP_BASE_URL + "/task", {
      title: this.state.task.title,
      body: this.state.task.body,
    })
      .then(() => {
        axios.get(process.env.REACT_APP_BASE_URL + "/task")
          .then((tasks) => {
            console.log(tasks.data)
            this.setState({
              tasks: tasks.data,
              create: false
            })
          })
      })
    // console.log("body", this.state.task.body)
    // console.log("title", this.state.task.title)
  }
  deleteTask = (id) => {
    axios.delete(process.env.REACT_APP_BASE_URL + `/task/${id}`, { body: id })
      .then(() => {

        this.setState({
          tasks: this.state.tasks.filter(function (task) {
            return task._id !== id;
          })
        })


      }) // change for array element pop
  }
  editTask = (e) => {

    axios.put(process.env.REACT_APP_BASE_URL + `/task/${this.state.id}`, {
      title: this.state.task.title,
      body: this.state.task.body
    })
      .then(() => this.componentDidMount())
    this.showEditForm()
  }
  showForm = () => {
    if (this.state.create === false) {
      //show edit form
      this.setState({
        create: true
      })
    } else {
      //close edit form
      this.setState({
        create: false
      })
    }
  }
  showEditForm = (id) => {
    console.log("ediiiit")
    if (this.state.edit === false) {
      //show edit form
      this.setState({
        edit: true,
        id: id
      })

    } else {
      //close edit form
      this.setState({
        edit: false
      })
    }
  }
  done = async (id, status) => {
    console.log(this.state.task.status)
    if (status === 'done') {

      axios.put(process.env.REACT_APP_BASE_URL + `/task/${id}`, {
        status: 'todo'
      })
        .then(() => {
          this.componentDidMount()

        })

    } else {

      axios.put(process.env.REACT_APP_BASE_URL + `/task/${id}`, {
        status: 'done'
      })
        .then(() => {
          this.componentDidMount()

        })
    }
  }
  showDoneContainer = () => {
    if (this.state.todoContainer)
      this.setState({
        todoContainer: false,
      })
    else {
      this.setState({
        todoContainer: true,
      })
    }
    this.componentDidMount()
  }

  data = {
    labels: [
      "hola",
      'Green',
      'Yellow'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
  }

  render() {
    return (
      <div className="task-container">
        <button className="btn btn-create" onClick={this.showForm}><h3>New Task</h3></button>
        <button className="btn btn-show-done" onClick={this.showDoneContainer}>{this.state.todoContainer ? <h3>Show done list </h3> : <h3>Show To-Do list</h3>} </button>

        {(this.state.todoContainer) ?
          <div className="container">
            <h3>To-Do</h3>
            <hr className="container-separator"></hr>
            <div className="tasks tasks-todo">

              {this.state.tasks.map((task) => {
                return task.status === 'done' ? false : <TaskCard title={task.title} body={task.body} onClickDelete={() => this.deleteTask(task._id)} showEditForm={() => this.showEditForm(task._id)} done={() => this.done(task._id, task.status)} id={task._id}></TaskCard>
              })}

            </div>
            <hr className="container-separator" />
          </div>
          :
          <div className="container">
            <h3>Done</h3>
            <hr className="container-separator" />
            <div className="tasks tasks-done">

              {this.state.tasks.map((task) => {
                return task.status === 'todo' ? false : <TaskCard title={task.title} body={task.body} id={task._id} done={() => this.done(task._id, task.status)} onClickDelete={() => this.deleteTask(task._id)}></TaskCard>
              })}

            </div>
            <hr className="container-separator" />
          </div>

        }

        {this.state.edit ? <Form onClick={this.showEditForm} onSubmitForm={this.editTask} edit={this.state.edit} onChangeTitle={this.onChangeTitle} onChangeBody={this.onChangeBody}>Edit</Form> : false}
        {this.state.create ? <Form onSubmitForm={this.onSubmitForm} onClick={this.showForm} onChangeTitle={this.onChangeTitle} onChangeBody={this.onChangeBody}>Create</Form> : false}

      </div>
    )
  }
}
