import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect} from 'react-router-dom'

class Dashboard extends Component{
    render(){
        const { projects, auth, notifications} = this.props
        console.log(notifications)
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m7">
                        <ProjectList projects={projects} />
                    </div>
                    <div className="col s12 m4 offset-m1">
                        <Notifications notifications={notifications}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        projects: state.firestore.ordered.projects, // get from firestore
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']} // limited to 3 results of collection
    ])
)(Dashboard)