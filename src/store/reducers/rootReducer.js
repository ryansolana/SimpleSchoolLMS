import authReducer from './authReducer'
import projectReducer from './projectReducer'
import announceReducer from './announceReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'


const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    announce: announceReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer