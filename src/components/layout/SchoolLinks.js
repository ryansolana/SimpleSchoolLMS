import React from 'react'
import { NavLink } from 'react-router-dom'

const SchoolLinks = (props) => {
    return(
        <ul className="left">
            <li><NavLink to='/create'>Announcements</NavLink></li>
            <li><NavLink to='/signin'>Course Material</NavLink></li>
            <li><NavLink to='/create'>My Progress</NavLink></li>
            <li><NavLink to='/signin'>My Submissions</NavLink></li>
            <li><NavLink to='/create'>My Calendar</NavLink></li>
        </ul>
    )
}

export default SchoolLinks