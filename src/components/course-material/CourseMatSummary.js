import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const CourseMatSummary = ({coursemat, profile}) => {
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
                    </div>
                </div>
                <div className="col s1">
                    {profile.isAdmin && <td><Link to={'/editCourseMat/' + coursemat.id}><i className="material-icons black-text text-darken-3">edit</i></Link></td>} 
                </div> 
                 
            </div>
            <div className="card-action grey lighten-4 grey-text">
                <p className="grey-text">Released {moment(coursemat.createdAt.toDate()).calendar()}</p>
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

export default connect(mapStateToProps, null)(CourseMatSummary)
