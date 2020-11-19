import React from 'react'
import { NavLink } from 'react-router-dom'

const SchoolLinks = (props) => {
    return(
        <ul className="left">
            <li><NavLink to='/announcements' className="sidenav-close">Announcements</NavLink></li>
            <li><NavLink to='/course-materials' className="sidenav-close">Course Material</NavLink></li>
            <li><NavLink to='/submissions' className="sidenav-close">Submission</NavLink></li>
            {!props.profile.isAdmin && <li><NavLink to='/grades' className="sidenav-close">My Grades</NavLink></li>}
            <li><NavLink to='/calendar' className="sidenav-close">Calendar</NavLink></li>
            {props.profile.isAdmin &&
            <li><NavLink to='/studentManagement' className="sidenav-close blue adminBtn">Student Management</NavLink></li>}
        </ul>
    )

}

    

export default SchoolLinks