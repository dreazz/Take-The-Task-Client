import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
// import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import LogOut from './Logout';
import AnonRoute from './AnonRoute';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <div >
          <div class="nav">
          <img className="logo" src="/logo.png"></img>
          <h3 className="title-nav">Take the task</h3>
            {/* <NavLink to="/home">Home</NavLink> */}
            {this.props.authenticated ? (
              <span>
                {/* <NavLink to="/dashboard">Dashboard</NavLink> */}
                <LogOut />
              </span>
            ) : (
                <span>
                  {/* <NavLink to="/login">Login</NavLink> */}
                  {/* <NavLink to="/register">Register</NavLink> */}
                </span>
              )}
          </div>
          <Switch>
            <ProtectedRoute authenticated={this.props.authenticated} exact path="/home" component={Home} />
            <AnonRoute authenticated={this.props.authenticated} path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute authenticated={this.props.authenticated} exact path="/" component={Home} />
            {/* <ProtectedRoute authenticated={this.props.authenticated} path="/dashboard" component={Dashboard} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}
export default Navigation;