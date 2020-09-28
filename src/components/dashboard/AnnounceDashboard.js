import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class AnnounceDashboard extends Component{
    render(){
        const { projects, auth} = this.props
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s6">
                        <h3 className="padding">Announcements</h3>
                    </div>
                    <div className="col s6">
                        <Link to='/createAnnounce'>
                            <button className="btn waves-effect waves-light blue">Create New Announcement</button>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        
                        <ProjectList projects={projects} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        projects: state.firestore.ordered.projects, // get from firestore
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    ])
)(AnnounceDashboard)