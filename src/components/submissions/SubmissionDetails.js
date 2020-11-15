import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'


const SubmissionDetails = ({ submission, auth }) => {

    if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
    if (submission){
        return (
        <div>
            <div className="container section submission-details">
                <div className="card z-depth-1">
                    <div className="card-content">
                        <div className="row">
                            <span className="card-title">{submission.title}</span>          
                            <div>Posted {moment(submission.createdAt.toDate()).calendar()}</div>
                            <br></br>
                            <span className="card-subtitle text-bold">{submission.subtitle}</span> 
                            <br></br><br></br>
                            <p>{submission.content}</p>
                        </div>
                    </div>
                    <div className="card-action grey lighten-4 black-text">
                        {submission.textlink.length > 1 ? <div className="margin-top-20"><p className="text-bold">Dropbox Link</p>
                        <a href={submission.textlink} target="_blank" rel="noopener noreferrer"><i className="material-icons blue-text text-darken-3 link">cloud_download</i></a></div> 
                        : <div></div>}
                    </div>
                </div>  
            </div>
        </div>
        )
    } else {
        return (
            <div className="container center">
                <h5>Loading course material...</h5>
                <div class="progress">
                    <div class="indeterminate"></div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log(state)
    const id = ownProps.match.params.id;
    const submissions = state.firestore.data.submissions
    const submission = submissions ? submissions[id] : null
    return {
        submission: submission,
        auth: state.firebase.auth,
        id: ownProps.match.params.id
    }
}

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect([
        { collection: 'submissions'}
    ])
)(SubmissionDetails)
