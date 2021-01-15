import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import '../config/secret'

var firebaseConfig = secret;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;