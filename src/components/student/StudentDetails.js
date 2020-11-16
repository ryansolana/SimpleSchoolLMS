import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const StudentDetails = ({ student, auth }) => {

    if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
    if (student){
        const parsedDate = student.joinDate.seconds * 1000;
        var timeStamp = new Date(parsedDate);
        var date = moment(timeStamp).format('LLL');

        return (
        <div>
            <div className="container section student-details">
                <div className="card z-depth-1">
                    <div className="card-content">
                        <div className="row">  
                            <h4>Student Details</h4>

                            <p><bold>Full Name: </bold> {student.firstName} {student.lastName}</p>
                            <p><bold>Email: </bold>{student.email}</p>
                            <p><bold>Activated?: </bold>{student.isActivated ? "True" : "False"}</p>
                            <p><bold>Register Date: </bold>{date}</p>
                            <p><bold>Activation Date: </bold>{date}</p>
                            
                        </div>
                    </div>
                    <div className="card-action white lighten-4 black-text">
                        <h5>Actions</h5>
                        <button className="btn blue">Create Submission Grade</button>
                    </div>
                    <div className="card-action white lighten-4 black-text">
                        <h5>Student Grades</h5>
                       
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
    const students = state.firestore.data.users
    const student = students ? students[id] : null
    return {
        student: student,
        auth: state.firebase.auth,
        id: ownProps.match.params.id
    }
}

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect([
        { collection: 'users'}
    ])
)(StudentDetails)
