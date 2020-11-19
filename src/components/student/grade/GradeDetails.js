import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteGrade } from '../../../store/actions/gradeActions'
import { Link } from 'react-router-dom'

const GradeDetails = (props) => {
    const { grade, auth, profile, deleteGrade, id} = props;

    const deleteHandler = (id) =>{
        deleteGrade(id); 
        props.history.push('/gradements');
    }
    
    console.log(grade)

    if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

    if (grade){
        return (
        <div>
            <div className="container section grade-details">
                <div className="card z-depth-2">
                    <div className="card-content">
                        <div className="row">
                            <span className="card-title">{grade.title}</span>
                            <div>Posted by {grade.authorFirstName} {grade.authorLastName}, {moment(grade.createdAt.toDate()).calendar()}</div>
                        </div>
                    </div>

                    <div className="card-action"> 
                        <p>{grade.content}</p>
                        <br></br>
                        {grade.contentLink && grade.contentLink !== "" && <a href={grade.contentLink} alt="/" target="_blank"><button className="btn">Link</button></a>}
                    </div>
                </div>

                {
                profile.admin && <div>
                    <button className="btn red" onClick={() => deleteHandler(id)}>Delete this gradement</button>
                    &nbsp;
                    <button className="btn orange"><Link to={'/editGrade/' + id}><div className="white-text">Edit this gradement</div></Link></button>
                    
                    </div>     
                } 
                
            </div>
        </div>
        )
    } else {
        return (
            <div className="container center">
                <h5>Loading gradement...</h5>
                <div class="progress">
                    <div class="indeterminate"></div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteGrade: (grade) => dispatch(deleteGrade(grade))
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log(state)
    const id = ownProps.match.params.id;
    const grades = state.firestore.data.grades
    const grade = grades ? grades[id] : null
    return {
        grade: grade,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        id: ownProps.match.params.id
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'grades'}
    ])
)(GradeDetails)
