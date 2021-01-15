import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

class Landing extends Component {
    render(){
        const { auth, profile } = this.props
        
        if (!auth.emailVerified) return <Redirect to='/verify' />
        if (!profile.isActivated) return <Redirect to='/activate' />

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
                                <span className="card-title bold-text">Welcome back, {profile.isAdmin ? "Professor" : "Student"} {profile.firstName} {profile.lastName}!</span>
                                <p>You last logged in {date}</p>
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
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(Landing)
