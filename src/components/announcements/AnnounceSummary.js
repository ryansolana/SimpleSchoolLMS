import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const AnnounceSummary = ({announce, profile}) => {

    const date = moment(announce.createdAt.toDate()).calendar()

    return (
        <div className="card z-depth-1 announce-summary">
            <div className="row">
                <div className="col s1">
                  <i className="material-icons grey-text text-darken-3 summary">announcement</i>
                </div>
                <div className="col s9 offset-s1">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{announce.title}</span>
                        <span>Posted by {announce.authorFirstName} {announce.authorLastName}, {date}</span>
                    </div>
                    <div className="card-action">
                        <p>{announce.content}</p>
                        <br></br>
                        {announce.contentLink && <div><a href={announce.contentLink} alt="/" target="_blank"><button className="btn">Link</button></a><br></br><br></br></div>}
                        
                    </div>
                </div>

                <div className="col s1">
                    {profile.admin && <td><Link to={'/editAnnounce/' + announce.id}><i className="material-icons black-text text-darken-3">edit</i></Link></td>} 
                </div> 
            </div>

                
        </div>

    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps, null)(AnnounceSummary)