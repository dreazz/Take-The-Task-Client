import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyBim9asKec6yb12tkqlSs-UyjyJmXX-hdM",
  authDomain: "take-the-task.firebaseapp.com",
  databaseURL: "https://take-the-task.firebaseio.com",
  projectId: "take-the-task",
  storageBucket: "take-the-task.appspot.com",
  messagingSenderId: "530443074387"
};
firebase.initializeApp(config);
export default firebase;