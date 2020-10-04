import React from 'react'
import moment from 'moment'

const ProgressModuleSummary = ({progressModule}) => {

    return (
        <div className="card z-depth-1 progressModule-summary hoverable">
            <div className="row">
                <div className="col s1">
                  <i className="material-icons grey-text text-darken-3 summary">announcement</i>
                </div>
                <div className="col s9 offset-s1">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{progressModule.title}</span>
                        <span className="card-subtitle">{progressModule.subtitle}</span> 
                        <hr></hr>  
                        <span className="truncate">{progressModule.content}</span>
                    </div>
                </div>
            </div>
            <div className="card-action grey lighten-4 grey-text">
                    <p>Posted by {progressModule.authorFirstName} {progressModule.authorLastName}</p>
                    <p className="grey-text">{moment(progressModule.createdAt.toDate()).calendar()}</p>
            </div>   
        </div>

    )
}


export default ProgressModuleSummary