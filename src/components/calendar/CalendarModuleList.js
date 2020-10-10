import React from 'react'
import CalendarModuleSummary from './CalendarModuleSummary'

const CalendarModuleList = ({calendarModules}) => {

  const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  if (!isEmpty(calendarModules)){
    return (
      <div className="calendarModule-list section z-depth-0">   
        { // check if calendarModules exists, if so, map
          calendarModules && calendarModules.map(calendarModule =>{
            return (
              <div>
                  <CalendarModuleSummary calendarModule={calendarModule} key={calendarModule.id}/>
              </div>
            )
          })
        }
      </div>
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
                  <div class="progress margin-top-20">
                    <div class="indeterminate"></div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
  }
    
}


export default CalendarModuleList
