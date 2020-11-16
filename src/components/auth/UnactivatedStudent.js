import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import * as firebase from 'firebase'

class UnactivatedStudent extends Component {

    constructor(props){
        super(props);

        this.state = {
            verifyClicked: false,
            isVerified: false
        }
    }

    refreshPage = ()=>{
        window.location.reload();
     }

    render(){
        const { auth, profile } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        if(profile.isActivated) return <Redirect to='/' />

        if (auth){
            const lastLogin = parseInt(auth.lastLoginAt);
            var timeStamp = new Date(lastLogin);
            var date = moment(timeStamp).calendar();

            return (
            <div> 
                <div className="dashboard container">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <h3 className="page-title">Awaiting Student Activation</h3>
                            <p>Thank you for verifying your email, {profile.admin ? "Professor" : ""} {profile.firstName} {profile.lastName}!</p>
                        </div>
                        <div className="card-action">
                            <p>Your account is not activated! Please contact your school administrator or professor to activate your account in order to access the course materials.</p>
                            <button className="btn green" onClick={this.refreshPage}>Check Activation Status</button>
                        </div>
                    </div>
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

export default connect(mapStateToProps, null)(UnactivatedStudent)
