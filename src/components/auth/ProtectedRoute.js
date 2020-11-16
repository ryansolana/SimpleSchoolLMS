import { auth } from 'firebase';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth, profile, ...rest}) => {
    // passes all tests or user is admin, then bypass
    if ((auth.emailVerified && profile.isActivated) || profile.isAdmin === true){
      return <Route {...rest} render={(props) => (
        <Component {...props} />)} 
      />
    }
    // check if 
    else if (auth.emailVerified && !profile.isActivated)
    {
      return <Route {...rest} render={(props) => (
          <Redirect to={{
              pathname: '/activate',
              state: { from: props.location }
            }
          } /> 
      )} />
    } else {
      // does not pass any test
      return <Route {...rest} render={(props) => (
          <Redirect to={{
              pathname: '/verify',
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