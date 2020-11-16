import React from 'react'
import StudentSummary from './StudentSummary'

const StudentList = ({students}) => {

  const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  console.log(students)

  if (!isEmpty(students)){
    return (
      <table className="calendar">
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
      <div className="calendar-list section z-depth-0">
        <div className="card z-depth-1 calendar-summary">
          <div className="row">
            <div className="col s1">
              <i className="material-icons grey-text text-darken-3 summary">assignment_late</i>
            </div>
            <div className="col s9 offset-s1">
              <div className="card-content grey-text text-darken-3">
                  <span className="card-title">No calendar material has been added yet</span>
                  <span className="card-subtitle">Check back again later!</span> 
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
  }
    
}


export default StudentList
