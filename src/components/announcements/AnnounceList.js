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

  if (!isEmpty(announces)){
    return (
      <div className="announce-list section z-depth-0">   
        { // check if announces exists, if so, map
          announces && announces.map(announce =>{
            return (
              <div>
                <Link to={'/announce/' + announce.id} key={announce.id}>
                  <AnnounceSummary announce={announce}/>
                </Link>

              </div>
            )
          })
        }
      </div>
    )
  } else {
    return(
      <div className="announce-list section z-depth-0">
        <div className="card z-depth-1 announce-summary">
          <div className="row">
            <div className="col s1">
              <i className="material-icons grey-text text-darken-3 announce">speaker_notes_off</i>
            </div>
            <div className="col s9 offset-s1">
              <div className="card-content grey-text text-darken-3">
                  <span className="card-title">No announcements have been posted yet</span>
                  <span className="card-subtitle">Check back later!</span> 
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
  }
    
}


export default AnnounceList
