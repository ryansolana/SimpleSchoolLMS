import React from 'react'
import ProgressModuleSummary from './ProgressModuleSummary'

const ProgressModuleList = ({progressModules}) => {

  const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  if (!isEmpty(progressModules)){
    return (
      <div className="progressModule-list section z-depth-0">   
        { // check if progressModules exists, if so, map
          progressModules && progressModules.map(progressModule =>{
            return (
              <div>
                  <ProgressModuleSummary progressModule={progressModule} key={progressModule.id}/>
              </div>
            )
          })
        }
      </div>
    )
  } else {
    return(
      <div className="progressModule-list section z-depth-0">
        <div className="card z-depth-1 progressModule-summary">
          <div className="row">
          <div className="card-content grey-text text-darken-3">
            <div className="col s3">
              <i className="material-icons grey-text text-darken-3 summary">import_contacts</i>
              <span className="card-title">No progress modules have been posted yet</span>
              <span className="card-subtitle">Check back again later!</span> 
              </div>
            </div>
            <div className="col s2 offset-s6">
              <i className="material-icons grey-text text-darken-3 summary">import_contacts</i>
            </div>
          </div>
        </div>
      </div>
    )
    
  }
    
}


export default ProgressModuleList