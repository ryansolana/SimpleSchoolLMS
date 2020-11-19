import React, { Component } from 'react'
import CalendarModuleList from '../calendar/CalendarModuleList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import moment from 'moment'


class CalendarModuleDashboard extends Component{
    render(){
        const { calendarModules, auth, profile} = this.props
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        var date = moment(new Date()).format("MMMM YYYY");

        return(
            <div className="dashboard container">
                <h3 className="page-title padding">School of Logistics - {date} Calendar </h3>

                {profile.isAdmin ? <Link to='/createCalendarModule'>
                    <button className="btn waves-effect waves-light green text-darken-1 padding-top hoverable">Create New Calendar Module</button>
                </Link> : <div></div>}
            
                <div className="row">
                    <h5>Current Programming</h5>
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