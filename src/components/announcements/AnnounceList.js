import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

const AnnounceList = ({announces}) => {
    return (
        <div className="announce-list section z-depth-0">   
          { // check if announces exists, if so, map
            announces && announces.map(announce =>{
              return (
                <Link to={'/announce/' + announce.id} key={announce.id}>
                  <ProjectSummary announce={announce}/>
                </Link>
              )
            })
          }
        </div>
    )
}

export default AnnounceList