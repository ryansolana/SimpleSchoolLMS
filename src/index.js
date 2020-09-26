import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore, createFirestoreInstance} from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import fbConfig from './config/fbConfig'
import firebase from "firebase/app";
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig) // passing config into store enhancers so that it connects to appropiate db
  )
)

const profileSpecificProps = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false
}

// react-redux-firebase props
const rrfProps = {
  firebase,
  config: fbConfig,
  config: profileSpecificProps, // second config for user profile
  dispatch: store.dispatch,
  createFirestoreInstance
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)){
    return <div>Loading page...</div>
  }
  return children;
}

ReactDOM.render(
<Provider store={store}> 
  <ReactReduxFirebaseProvider {...rrfProps}> 
    <AuthIsLoaded>
      <App /> 
    </AuthIsLoaded>
  </ReactReduxFirebaseProvider>
</Provider>,
document.getElementById('root'));

/*
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
