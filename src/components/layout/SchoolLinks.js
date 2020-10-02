import React from 'react'
import { NavLink } from 'react-router-dom'

const SchoolLinks = (props) => {
    if (!props.profile.admin){
        return(
            <ul className="left">
                <li><NavLink to='/announcements' className="sidenav-close">Announcements</NavLink></li>
                <li><NavLink to='/course-material' className="sidenav-close">Course Material</NavLink></li>
                <li><NavLink to='/submissions' className="sidenav-close">My Submissions</NavLink></li>
                <li><NavLink to='/progress' className="sidenav-close">My Progress</NavLink></li>
                <li><NavLink to='/calendar' className="sidenav-close">My Calendar</NavLink></li>
            </ul>
        )
    } else {
        return(
            <ul className="left">
                <li><NavLink to='/announcements' className="sidenav-close">Announcements</NavLink></li>
                <li><NavLink to='/course-material' className="sidenav-close">Course Material</NavLink></li>
                <li><NavLink to='/submissions' className="sidenav-close">My Submissions</NavLink></li>
                <li><NavLink to='/progress' className="sidenav-close">My Progress</NavLink></li>
                <li><NavLink to='/calendar' className="sidenav-close">My Calendar</NavLink></li>
                <li><NavLink to='/student-management' className="sidenav-close">Student Management</NavLink></li>
            </ul>
        )
    }
}

    

export default SchoolLinks