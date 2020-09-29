import React from 'react'
import moment from 'moment'

const AnnounceSummary = ({announce}) => {

    return (
        <div className="card z-depth-1 announce-summary hoverable">
            <div className="row">
                <div className="col s1">
                  <i className="material-icons grey-text text-darken-3 announce">announcement</i>
                </div>
                <div className="col s9 offset-s1">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{announce.title}</span>
                        <span className="card-subtitle">{announce.subtitle}</span> 
                        <hr></hr>  
                        <span className="truncate">{announce.content}</span>
                    </div>
                </div>
            </div>
            <div className="card-action grey lighten-4 grey-text">
                    <p>Posted by {announce.authorFirstName} {announce.authorLastName}</p>
                    <p className="grey-text">{moment(announce.createdAt.toDate()).calendar()}</p>
            </div>   
        </div>

    )
}


export default AnnounceSummary