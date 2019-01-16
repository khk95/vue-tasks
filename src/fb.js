import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyAmyuQUvzRLsHlxztBlwzYJiOjkQpeJI6Y",
    authDomain: "taskskhk.firebaseapp.com",
    databaseURL: "https://taskskhk.firebaseio.com",
    projectId: "taskskhk",
    storageBucket: "taskskhk.appspot.com",
    messagingSenderId: "174435825115"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

db.settings({
    timestampsInSnapshots: true
});

export default {
    db: db,
    auth: auth
}