import React from 'react'
import { NavLink } from 'react-router-dom'

const SchoolLinks = (props) => {
    if (!props.profile.admin){
        return(
            <ul className="left">
                <li><NavLink to='/announcements' className="sidenav-close">Announcements</NavLink></li>
                <li><NavLink to='/course-materials' className="sidenav-close">Course Material</NavLink></li>
                <li><NavLink to='/submissions' className="sidenav-close">Submissions</NavLink></li>
                <li><NavLink to='/calendar' className="sidenav-close">Calendar</NavLink></li>
            </ul>
        )
    } else {
        return(
            <ul className="left">
                <li><NavLink to='/announcements' className="sidenav-close">Announcements</NavLink></li>
                <li><NavLink to='/course-materials' className="sidenav-close">Course Material</NavLink></li>
                <li><NavLink to='/submissions' className="sidenav-close">Submissions</NavLink></li>
                <li><NavLink to='/calendar' className="sidenav-close">Calendar</NavLink></li>

                <li><NavLink to='/student-management' className="sidenav-close btn light-blue bold-text">Student Management</NavLink></li>
            </ul>
        )
    }
}

    

export default SchoolLinks