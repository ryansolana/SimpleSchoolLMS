import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import * as firebase from 'firebase'

class Landing extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
                console.log('user changed..', user);
            } else {
                console.log('no user logged in')
            }
        });
    }

    render(){
        const {auth, profile} = this.props
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        //if (!auth.emailVerified) return <Redirect to='/verify' />
        
        if (auth){
            const lastLogin = parseInt(auth.lastLoginAt);
            var timeStamp = new Date(lastLogin);
            var date = moment(timeStamp).calendar();

            return (
                <div>
                    <div className="dashboard container">
                    <h3 className="padding page-title">Home</h3>
                        <div className="card z-depth-1">
                            <div className="card-content">
                                <span className="card-title bold-text">Welcome back, {profile.admin ? "Professor" : "Student"} {profile.firstName} {profile.lastName}!</span>
                                <p>You last logged in {date}</p>
                            </div>
                        </div>
                        <img className="header-img z-depth-1" src="/img/header.png" alt="yeah"></img>
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

export default connect(mapStateToProps, null)(Landing)
