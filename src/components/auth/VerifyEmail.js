import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import * as firebase from 'firebase'

class VerifyEmail extends Component {

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log('user changed..', user);
            }
        });
    }

    render(){
        const { auth, profile } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
        if (auth){
            const lastLogin = parseInt(auth.lastLoginAt);
            var timeStamp = new Date(lastLogin);
            var date = moment(timeStamp).calendar();

            return (
            <div>
                <div className="dashboard container">
                <h3 className="page-title">Email Verification</h3>
                    <p>Welcome back, {profile.admin ? "Professor" : ""} {profile.firstName} {profile.lastName}!</p>
                    <p>Please verify your e-mail for {auth.email} to finish signing up for School of Logistics</p>
                    <button className="btn blue waves-effect hoverable">Send Verification Email</button>
                </div>
            </div>
            )
        } else {
            return (
                <div className="container center">
                    <p>Loading landing page...</p>
                </div>
            )
        }
    } 

}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(VerifyEmail)
