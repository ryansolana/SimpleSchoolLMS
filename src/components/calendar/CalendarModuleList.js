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
      <table className="calendar striped">
        <thead> 
          <tr>
            <th className="text-center">Week #</th>
            <th className="text-center">Module / Assignment</th>
            <th className="text-center">Status</th>
            <th className="text-center">Open / Due Date</th>
          </tr>
        </thead> 
        <tbody>
          { // check if calendarModules exists, if so, map
            calendarModules && calendarModules.map(calendarModule =>{
              return (
                <CalendarModuleSummary calendarModule={calendarModule} key={calendarModule.id}/>
              )
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


export default CalendarModuleList
