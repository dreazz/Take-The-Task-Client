import axios from 'axios';

class TaskProvider {
  constructor() {
    this.task = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }
  getTasks(){
   return this.Task("/task")
      .then((data) => data)
  }
  getTasks(user) {
    const { username, password } = user;
    return this.auth.post('/auth/signup', {username, password})
      .then(({ data }) => data);
  }

  login(user) {
    const { username, password } = user;
    return this.auth.post('/auth/login', {username, password})
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/auth/logout', {})
      .then(response => response.data)
  }

  me(user) {
    return this.auth.get('/auth/me')
    .then(response => response.data)
  }
}

const taskProvider = new TaskProvider();

export default TaskProvider;