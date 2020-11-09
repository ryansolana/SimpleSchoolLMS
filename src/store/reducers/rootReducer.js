import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

import announceReducer from './announceReducer'
import coursematReducer from './coursematReducer'
import submissionReducer from './submissionReducer'
import calendarReducer from './calendarReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    announce: announceReducer,
    coursemat: coursematReducer,
    calendar: calendarReducer,
    submission: submissionReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer