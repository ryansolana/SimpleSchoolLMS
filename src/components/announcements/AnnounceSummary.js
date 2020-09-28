import React from 'react'
import moment from 'moment'

const ProjectSummary = ({announce}) => {
    return (
        <div className="card z-depth-1 announce-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{announce.title}</span>  
                <p>Posted by {announce.authorFirstName} {announce.authorLastName}</p>
                <p className="grey-text">{moment(announce.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    )
}

export default ProjectSummary