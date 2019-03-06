import React, { Component } from 'react'
import TaskCard from './TaskCard'
import Form from './Form';
import axios from 'axios';
import '../static/taskcontainer.css'
import Swiper from 'react-id-swiper';

import { Bubble, Doughnut, Bar, crazyLine, HorizontalBar, Radar } from 'react-chartjs-2';


export default class TaskContainer extends Component {

  state = {
    tasks: [],
    tasksDone: [],
    tasksTodo: [],
    tasksDonelength: 0,
    tasksTodolength: 0,

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
          tasks: tasks.data,
          tasksDone: tasks.data.filter((task) => task.status === 'done'),
          tasksTodo: tasks.data.filter((task) => task.status === 'todo'),
         // tasksDoing:tasks.data.filter((task) => task.status === 'doing'),

        })
        this.setState({
          tasksDonelength: this.state.tasksDone.length,
          tasksTodolength: this.state.tasksTodo.length,
        })
        console.log(this.state.tasksTodolength)

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



  render() {
    const data = {
      labels: ['Todo', 'Done','Total'],
      datasets: [
        {

          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
         
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [this.state.tasksTodolength, this.state.tasksDonelength,this.state.tasks.length,0]
        }

      ]
    };
    return (
      <div className="task-container">
        <div className="button-container">
          <button className="btn main-btn btn-create" onClick={this.showForm}><h3>New Task</h3></button>
          <button className="btn main-btn btn-show-done" onClick={this.showDoneContainer}>{this.state.todoContainer ? <h3>Show done list </h3> : <h3>Show Stats</h3>} </button>
        </div>
        {this.state.todoContainer ?
          <div>
            <div className="container">
              <h3>To-Do</h3>
              <hr className="container-separator"></hr>

              <div className="tasks tasks-todo">

                {this.state.tasks.map((task) => {

                  return task.status === 'done' ? false : <TaskCard title={task.title} body={task.body} onClickDelete={() => this.deleteTask(task._id)} showEditForm={() => this.showEditForm(task._id)} done={() => this.done(task._id, task.status)} id={task._id}></TaskCard>
                })}
              </div>


            </div>

            <div className="container">
              <h3>Done</h3>
              <hr className="container-separator" />
              <div className="tasks tasks-done">

                {this.state.tasks.map((task) => {
                  return task.status === 'todo' ? false : <TaskCard title={task.title} body={task.body} id={task._id} done={() => this.done(task._id, task.status)} onClickDelete={() => this.deleteTask(task._id)}></TaskCard>
                })}

              </div>

            </div>
          </div>
          :
          <div>
            <HorizontalBar data={data} width={100} height={1000} options={{
              maintainAspectRatio: false
            }}></HorizontalBar>
          </div>
        }
        {this.state.edit ? <Form onClick={this.showEditForm} onSubmitForm={this.editTask} edit={this.state.edit} onChangeTitle={this.onChangeTitle} onChangeBody={this.onChangeBody}>Edit</Form> : false}
        {this.state.create ? <Form onSubmitForm={this.onSubmitForm} onClick={this.showForm} onChangeTitle={this.onChangeTitle} onChangeBody={this.onChangeBody}>Create</Form> : false}

      </div>
    )
  }
}
