import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyAaUe8CCBo6W-YrXmHQgWlwKULYDHzu_fE",
  authDomain: "soc-database.firebaseapp.com",
  databaseURL: "https://soc-database.firebaseio.com",
  projectId: "soc-database",
  storageBucket: "soc-database.appspot.com",
  messagingSenderId: "376582079694",
  appId: "1:376582079694:web:d0672d9671941b5c69bc9f",
  measurementId: "G-Q5HCBN55EG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;