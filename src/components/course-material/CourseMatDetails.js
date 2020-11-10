import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteCourseMat } from '../../store/actions/coursematActions'

const CourseMatDetails = (props) => {

    const { coursemat, auth} = props;
    console.log("coursemat props is: ")
    console.log(coursemat)

    if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
    if (coursemat){
        return (
        <div>
            <div className="container section coursemat-details">
                <div className="card z-depth-2">
                    <div className="card-content">
                        <div className="row">
                            <span className="card-title">{coursemat.title}</span>
                            <span>Posted {moment(coursemat.createdAt.toDate()).calendar()}</span>
                            <br></br><br></br>
                            <span className="card-subtitle text-bold">{coursemat.subtitle}</span>
                            
                            <br></br><br></br>
                            <p>{coursemat.content}</p>
                            
                        </div>
                    </div>
                    <div className="card-action black-text">
                        {coursemat.textlink.length > 1 ? <div className="margin-top-20">
                        <p className="text-bold">Download Link</p>
                        <a href={coursemat.textlink} target="_blank" rel="noopener noreferrer"><i className="material-icons blue-text text-darken-3 summary">cloud_download</i></a></div> 
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
    const coursemats = state.firestore.data.coursemats
    const coursemat = coursemats ? coursemats[id] : null
    return {
        coursemat: coursemat,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        id: ownProps.match.params.id
    }
}

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect([
        { collection: 'coursemats'}
    ])
)(CourseMatDetails)
