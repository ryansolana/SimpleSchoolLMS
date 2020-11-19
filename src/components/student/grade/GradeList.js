import React from 'react'
import GradeSummary from './GradeSummary'

const GradeList = ({grades}) => {

  const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  console.log(grades)
  console.log(isEmpty(grades))


  if (!isEmpty(grades)){
    return (
      <table className="grade striped">
        <thead> 
          <tr>
            <th className="text-center">Title</th>
            <th className="text-center" style={{textAlign: "left"}}>Mark</th>
            <th className="text-center" style={{textAlign: "left"}}>Feedback</th>
            <th className="text-center"></th>
          </tr>
        </thead> 
        <tbody>
          { // check if grades exists, if so, map
            grades && grades.map(grade =>{
              return (
                <GradeSummary grade={grade} key={grade.id}/>
              )

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
                  <span className="card-title">No grade material has been added yet</span>
                  <span className="card-subtitle">Check back again later!</span> 
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
  }
    
}


export default GradeList
