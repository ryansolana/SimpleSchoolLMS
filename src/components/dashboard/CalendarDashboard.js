import React, { Component } from 'react'
import CalendarModuleList from '../calendar/CalendarModuleList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import 'react-circular-progressbar/dist/styles.css';

class CalendarModuleDashboard extends Component{
    render(){
        const { calendarModules, auth, profile} = this.props
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        console.log(profile)
        return(
            <div className="dashboard container">
                <h3 className="padding">My Calendar</h3>

                {profile.admin ? <Link to='/createCalendarModule'>
                    <button className="btn waves-effect waves-light blue padding-top hoverable">Create New Calendar Module</button>
                </Link> : <div></div>}
            
                <div className="row">
                    <h5>Courses</h5>
                    <CalendarModuleList calendarModules={calendarModules} />
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        calendarModules: state.firestore.ordered.calendarModules, // get from firestore
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'calendarModules', orderBy: ['weekNum', 'asc'] },
    ])
)(CalendarModuleDashboard)