import firebase from 'firebase';
const config = {
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain: "take-the-task.firebaseapp.com",
  databaseURL: "https://take-the-task.firebaseio.com",
  projectId: "take-the-task",
  storageBucket: "take-the-task.appspot.com",
  messagingSenderId:process.env.REACT_APP_SENDER_ID
};
firebase.initializeApp(config);
export default firebase;