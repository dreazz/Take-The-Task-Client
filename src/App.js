import React, { Component } from 'react';
import TaskContainer from './components/TaskContainer'
import './App.css';
import Navigation from './components/auth/Navigation';
import firebase from './components/auth/firebase';
class App extends Component {
 state = {
   authenticated: false,
   loading: true,
 };
 componentDidMount() {
   firebase.auth().onAuthStateChanged((authenticated) => {
     authenticated
       ? this.setState(() => ({
           authenticated: true,
           loading: false,
         }))
       : this.setState(() => ({
           authenticated: false,
           loading: false,
         }));
   });
 }
 render() {
   if (this.state.loading) {
     return <div className="loading-div"><img className="logo-loading" src="/logo.png"></img></div>
   }
   return <Navigation authenticated={this.state.authenticated} />
   }
}
export default App;
