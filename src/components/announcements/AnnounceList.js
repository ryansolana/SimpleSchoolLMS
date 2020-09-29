import React from 'react'
import AnnounceSummary from './AnnounceSummary'
import { Link } from 'react-router-dom'

const AnnounceList = ({announces}) => {
    return (
        <div className="announce-list section z-depth-0">   
          { // check if announces exists, if so, map
            announces && announces.map(announce =>{
              return (
                <div>
                  <Link to={'/announce/' + announce.id} key={announce.id}>
                    <AnnounceSummary announce={announce}/>
                  </Link>
                  <p>Id of announce is: {announce.id}</p>
                </div>
              )
            })
          }
        </div>
    )
}


export default AnnounceList
