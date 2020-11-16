import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, auth, profile, ...rest}) => (
    <Route {...rest} render={(props) => (
      (profile.isAdmin)
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/401',
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

export default connect(mapStateToProps, null)(AdminRoute)