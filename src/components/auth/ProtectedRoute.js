import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth, profile, ...rest}) => (
    <Route {...rest} render={(props) => (
      (auth.emailVerified)
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/verify',
            state: { from: props.location }
          }} />
    )} />
  );

  const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps, null)(ProtectedRoute)