import React from 'react'
import StudentSummary from './StudentSummary'

const StudentList = ({students}, type) => {

  const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  if (students){
    if (!isEmpty(students)){
      return (
        <table className="calendar striped">
          <thead> 
            <tr>
              <th className="text-center">Full Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Activated?</th>
              <th className="text-center">Join Date</th>
              <th className="text-center"></th>
            </tr>
          </thead> 
          <tbody>
            { // check if students exists, if so, map
              students && students.map(student =>{
                if (!student.isAdmin){
                  return (
                    <StudentSummary student={student} key={student.id}/>
                  )
                } 
              })
            }
          </tbody>
        </table>
      )
    } else {
      return( 
      <div className="grade-list section z-depth-0">
      <div className="card z-depth-1 grade-summary">
        <div className="row">
          <div className="col s1">
            <i className="material-icons grey-text text-darken-3 summary">assignment_late</i>
          </div>
          <div className="col s9 offset-s1">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">No students available to show</span>
            </div>
          </div>
        </div>
      </div>
    </div>)
    }
  } else {
    return(
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    )
    
  }
    
}


export default StudentList
