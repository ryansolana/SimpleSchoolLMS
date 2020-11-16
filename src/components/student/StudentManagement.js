import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import StudentList from './StudentList'

class StudentManagement extends Component{
    render(){
        const { auth, profile, users} = this.props
        
        console.log(users)
        return(
            <div className="dashboard container">
                <h3 className="padding page-title">Student Management</h3>

                <div className="row">
                    <h5>Current List of Students</h5>
                    <br></br>
                    <StudentList students={users} />
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        users: state.firestore.ordered.users, // get from firestore
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users', orderBy: ['firstName', 'desc'] },
    ])
)(StudentManagement)