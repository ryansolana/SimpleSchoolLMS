import React from 'react'
import CourseMatSummary from './CourseMatSummary'
import { Link } from 'react-router-dom'


const CourseMatList = ({coursemats}) => {

  const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  if (!isEmpty(coursemats)){
    return (
      <div className="coursemat-list section z-depth-0">   
        { // check if coursemats exists, if so, map
          coursemats && coursemats.map(coursemat =>{
            return (
              <div>
                <Link to={'/coursemat/' + coursemat.id} key={coursemat.id}>
                  <CourseMatSummary coursemat={coursemat}/>
                </Link>

              </div>
            )
          })
        }
      </div>
    )
  } else {
    return(
      <div className="coursemat-list section z-depth-0">
        <div className="card z-depth-1 coursemat-summary">
          <div className="row">
            <div className="col s1">
              <i className="material-icons grey-text text-darken-3 summary">assignment_late</i>
            </div>
            <div className="col s9 offset-s1">
              <div className="card-content grey-text text-darken-3">
                  <span className="card-title">No course material has been added yet</span>
                  <div class="progress">
                   <div class="indeterminate"></div>
                  </div>
                  <span className="card-subtitle">Check back again later!</span> 
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
  }
    
}


export default CourseMatList
