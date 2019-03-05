import React, { Component } from 'react'
import TaskCard from './TaskCard'
import Form from './Form';
import axios from 'axios';
import '../static/taskcontainer.css'

import {Doughnut} from 'react-chartjs-2';


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
              tasks: tasks.data,
              create: false
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
  editTask = (e) => {

    axios.put(`http://localhost:5000/task/${this.state.id}`, {
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
  done = async (id) => {
    await this.setState({
      task: {
        status: 'done',
        id: id
      }
    })
    axios.put(`http://localhost:5000/task/${id}`, {
      status: this.state.task.status
    })
      .then(() => {
        this.componentDidMount()

      })
  }
  showDoneContainer = () => {
    if(this.state.todoContainer)
    this.setState({
      todoContainer:false,
    })
    else{
      this.setState({
        todoContainer:true,
      })
    }
    this.componentDidMount()
  }
  data = {
    labels: [
      'Red',
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
      <div>
        <button onClick={this.showForm}>nuevo</button>
        <button onClick={this.showDoneContainer}>{this.state.todoContainer ? "done":"to-do"} </button>
        <Doughnut data={this.data} />
        {(this.state.todoContainer) ?
          <div className="tasks-todo">

            {this.state.tasks.map((task) => {
              return task.status === 'done' ? false : <TaskCard title={task.title} body={task.body} onClickDelete={() => this.deleteTask(task._id)} showEditForm={() => this.showEditForm(task._id)} done={() => this.done(task._id)} id={task._id}></TaskCard>
            })}

          </div>
          :
          <div className="tasks-done">

            {this.state.tasks.map((task) => {
              return task.status === 'done' ? <TaskCard title={task.title} body={task.body} id={task._id}></TaskCard> : false
            })}

          </div>

        }
        {this.state.edit ? <Form onClick={this.showEditForm} onSubmitForm={this.editTask} edit={this.state.edit} onChangeTitle={this.onChangeTitle} onChangeBody={this.onChangeBody}>Edit</Form> : false}
        {this.state.create ? <Form onSubmitForm={this.onSubmitForm} onClick={this.showForm} onChangeTitle={this.onChangeTitle} onChangeBody={this.onChangeBody}>Create</Form> : false}

      </div>
    )
  }
}
