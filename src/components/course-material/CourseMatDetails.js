import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteCourseMat } from '../../store/actions/coursematActions'

const CourseMatDetails = (props) => {

    const deleteHandler = (id) =>{
        deleteCourseMat(id); 
        props.history.push('/course-material');
    }

    const { coursemat, auth, profile, deleteCourseMat, id} = props;
    console.log("coursemat props is: ")
    console.log(coursemat)

    if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
    if (coursemat){
        return (
        <div>
            <div className="container section coursemat-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <div className="row">
                            <span className="card-title">{coursemat.title}</span>
                            <span className="card-subtitle">{coursemat.subtitle}</span> 
                        </div>
                        
                        <hr></hr>
                        <p>{coursemat.content}</p>

                        {coursemat.textlink.length > 1 ? <div className="margin-top-20"><h6>Cloud Drive Download Link</h6>
                        <a href={coursemat.textlink} target="_blank" rel="noopener noreferrer"><i className="material-icons grey-text text-darken-3 summary">cloud_download</i></a></div> 
                        : <div></div>}

                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {coursemat.authorFirstName} {coursemat.authorLastName}</div>
                        <div>{moment(coursemat.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
                {
                    profile.admin ? <button className="btn" onClick={() => deleteHandler(id)}>Delete this course material</button>: <div></div>
                }
                
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

const mapDispatchToProps = (dispatch) => {
    return{
        deleteCourseMat: (coursemat) => dispatch(deleteCourseMat(coursemat))
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
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'coursemats'}
    ])
)(CourseMatDetails)
