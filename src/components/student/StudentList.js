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

  if (students && !isEmpty(students)){
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
  } else if (!students){
    return(
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper center">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>`
    </div>
    ) 
} else {
    return(
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    )
    
  }
    
}


export default StudentList
