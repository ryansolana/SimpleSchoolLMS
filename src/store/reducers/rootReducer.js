import authReducer from './authReducer'
import announceReducer from './announceReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import coursematReducer from './coursematReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    announce: announceReducer,
    coursemat: coursematReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer