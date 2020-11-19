import React from 'react'
import AnnounceSummary from './AnnounceSummary'
import { Link } from 'react-router-dom'


const AnnounceList = ({announces}) => {

  const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  if (announces && !isEmpty(announces)){
    return (
      <div className="announce-list section z-depth-0">   
        { // check if announces exists, if so, map
          announces && announces.map(announce =>{
            return (
              <AnnounceSummary announce={announce} announceId={announce.id} key={announce.id}/>
            )
          })
        }
      </div>
    )
  } else if (!announces){
    return(
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    )
  } else {
    return(
      <div className="announce-list section z-depth-0">
        <div className="card z-depth-1 announce-summary">
          <div className="row">
            <div className="col s1">
              <i className="material-icons grey-text text-darken-3 summary">speaker_notes_off</i>
            </div>
            <div className="col s9 offset-s1">
              <div className="card-content grey-text text-darken-3">
                  <span className="card-title">No announcements have been posted yet</span>
                  <span className="card-subtitle">Check back again later!</span> 
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
  }
    
}


export default AnnounceList
