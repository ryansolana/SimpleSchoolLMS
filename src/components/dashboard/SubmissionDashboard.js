import React, { Component } from 'react'
import SubmissionList from '../submissions/SubmissionList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class SubmissionDashboard extends Component{
    render(){
        const { submissions, auth, profile} = this.props
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        console.log(profile)
        return(
            <div className="dashboard container">
                <h3 className="page-title padding">Submissions</h3>

                {profile.admin ? <Link to='/createSubmission'>
                    <button className="btn waves-effect waves-light green text-darken-1 padding-top hoverable">Create New Submission Dropbox</button>
                </Link> : <div></div>}
            
                <SubmissionList submissions={submissions} />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        submissions: state.firestore.ordered.submissions, // get from firestore
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'submissions', orderBy: ['createdAt', 'desc'] },
    ])
)(SubmissionDashboard)