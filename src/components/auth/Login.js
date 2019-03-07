import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from './firebase';
class Login extends Component {
  state = {
    email: '',
    password: '',
    error: null,
  };
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.history.push('/home');
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  };
  render() {
    const { email, password, error } = this.state;
    return (
      <div class="login auth">


        <div class="form login-form">

          <form onSubmit={this.handleSubmit}>
            <h2>Log In</h2>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleInputChange}
            />
            <button className="btn btn-submit">Log in</button>
            {error ? (
              <div>
                <p className="error">{error.message}</p>

              </div>
            ) : null}
          </form>

        </div>
      </div>
    );
  }
}
export default withRouter(Login);