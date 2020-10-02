import React from 'react'
import moment from 'moment'

const CourseMatSummary = ({coursemat}) => {

    return (
        <div className="card z-depth-1 coursemat-summary hoverable">
            <div className="row">
                <div className="col s1">
                  <i className="material-icons grey-text text-darken-3 summary">chrome_reader_mode</i>
                </div>
                <div className="col s9 offset-s1">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{coursemat.title}</span>
                        <span className="card-subtitle">{coursemat.subtitle}</span> 
                        <hr></hr>  
                        <span className="truncate">{coursemat.content}</span>
                    </div>
                </div>
            </div>
            <div className="card-action grey lighten-4 grey-text">
                    <p>Posted by {coursemat.authorFirstName} {coursemat.authorLastName}</p>
                    <p className="grey-text">{moment(coursemat.createdAt.toDate()).calendar()}</p>
            </div>   
        </div>

    )
}


export default CourseMatSummary