import React, { Component } from 'react'
import CourseMatList from '../course-material/CourseMatList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class CourseMatDashboard extends Component{
    render(){
        const { coursemats, auth, profile} = this.props
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        return(
            <div className="dashboard container">
                <h3 className="page-title padding">Course Material</h3>

                {profile.isAdmin? <Link to='/createCourseMat'>
                    <button className="btn waves-effect waves-light green text-darken-1 padding-top hoverable">Create New Course Material</button>
                </Link> : <div></div>}
            
                <CourseMatList coursemats={coursemats} />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        coursemats: state.firestore.ordered.coursemats, // get from firestore
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'coursemats', orderBy: ['createdAt', 'desc'] },
    ])
)(CourseMatDashboard)