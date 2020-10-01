import React from 'react'
import { NavLink } from 'react-router-dom'

const SchoolLinks = (props) => {
    return(
        <ul className="left">
            <li><NavLink to='/announcements'>Announcements</NavLink></li>
            <li><NavLink to='/course-material'>Course Material</NavLink></li>
            <li><NavLink to='/submissions'>My Submissions</NavLink></li>
            <li><NavLink to='/progress'>My Progress</NavLink></li>
            <li><NavLink to='/calendar'>My Calendar</NavLink></li>
        </ul>
    )
}

export default SchoolLinks