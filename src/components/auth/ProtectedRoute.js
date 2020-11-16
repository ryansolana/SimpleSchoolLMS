import { auth } from 'firebase';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth, profile, ...rest}) => {
    // passes all tests or user is admin, then bypass

    if (profile.isAdmin){
      return <Route {...rest} render={(props) => (
        <Component {...props} />)} 
      />
    }


    if (!profile.isAdmin || (auth.emailVerified && profile.isActivated)){
      return <Route {...rest} render={(props) => (
        <Component {...props} />)} 
      />
    }
    // check if activated
    else if (!profile.isAdmin && auth.emailVerified && !profile.isActivated)
    {
      return <Route {...rest} render={(props) => (
          <Redirect to={{
              pathname: '/activate',
              state: { from: props.location }
            }
          } /> 
      )} />
    } else if (!profile.isAdmin && !auth.emailVerified && !profile.isActivated){
      // does not pass any test
      return <Route {...rest} render={(props) => (
          <Redirect to={{
              pathname: '/verify',
              state: { from: props.location }
            }}/> 
      )} />
    } else {
      return <Route {...rest} render={(props) => (
        <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }}/> 
    )} />
    }
  };

  const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps, null)(ProtectedRoute)