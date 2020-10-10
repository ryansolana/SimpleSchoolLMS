import React from 'react'
import SubmissionSummary from './SubmissionSummary'
import { Link } from 'react-router-dom'


const SubmissionList = ({submissions}) => {
  const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  if (!isEmpty(submissions)){
    return (
      <div className="submission-list section z-depth-0">   
        { // check if submissions exists, if so, map
          submissions && submissions.map(submission =>{
            return (
              <div>
                <Link to={'/submission/' + submission.id} key={submission.id}>
                  <SubmissionSummary submission={submission}/>
                </Link>

              </div>
            )
          })
        }
      </div>
    )
  } else {
    return(
      <div className="submission-list section z-depth-0">
        <div className="card z-depth-1 submission-summary">
          <div className="row">
            <div className="col s1">
              <i className="material-icons grey-text text-darken-3 summary">event_busy</i>
            </div>
            <div className="col s9 offset-s1">
              <div className="card-content grey-text text-darken-3">
                <span className="card-title">No submission dropboxes has been added yet</span>
                <span className="card-subtitle">Check back again later!</span> 
                <div class="progress margin-top-20">
                  <div class="indeterminate"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
  }
    
}


export default SubmissionList
