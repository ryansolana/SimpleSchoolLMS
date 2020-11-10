import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const SubmissionSummary = ({submission, profile}) => {

    return (
        <div className="card z-depth-1 submission-summary hoverable">
            <div className="row">
                <div className="col s1">
                  <i className="material-icons grey-text text-darken-3 summary">move_to_inbox</i>
                </div>
                <div className="col s9 offset-s1">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{submission.title}</span>
                        <span className="card-subtitle">{submission.subtitle}</span> 
                    </div>
                </div>
                <div className="col s1">
                    {profile.admin && <td><Link to={'/editSubmission/' + submission.id}><i className="material-icons black-text text-darken-3">edit</i></Link></td>} 
                </div> 
            </div>
            <div className="card-action grey lighten-4 grey-text">
                <p className="grey-text">Opened {moment(submission.createdAt.toDate()).calendar()}</p>
            </div>   
        </div>

    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(SubmissionSummary)