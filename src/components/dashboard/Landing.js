import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const Landing = (props) => {
    const { auth, profile } = props;
    if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
    if (auth){

        const lastLogin = parseInt(auth.lastLoginAt);
        var timeStamp = new Date(lastLogin);
        var date = moment(timeStamp).calendar();

        return (
        <div>
            <div className="container section project-details">
                <div className="card z-depth-1">
                    <div className="card-content">
                        <span className="card-title">Welcome back, {profile.firstName} {profile.lastName}!</span>
                        <p>You last logged in {date}</p>
                    </div>
                    
                </div>
            </div>
        </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading project...</p>
            </div>
        )
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
