import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

// TBD: Announcements, Course Material, My Progress, Submissions, My Calendar

const SchoolMenu = (props) => {
    const { auth, profile } = props
    console.log(auth)


    const authenticated = auth.uid;

    const test = false;

    if (authenticated){
        return(
            <nav className="transparent z-depth-0">
                <div className="container">
                    <ul className="left school-menu">
                        <li><button className="btn btn-large waves-effect waves-light blue darken-4" type="submit">Announcements</button></li>
                        <li><button className="btn btn-large waves-effect waves-light blue darken-4" type="submit">Course Material</button></li>
                        <li><button className="btn btn-large waves-effect waves-light blue darken-4" type="submit">My Progress</button></li>
                        <li><button className="btn btn-large waves-effect waves-light blue darken-4" type="submit">Submissions</button></li>
                        <li><button className="btn btn-large waves-effect waves-light blue darken-4" type="submit">Calendar</button></li>
                    </ul>
                </div>
            </nav>
        )
    } else{
        return(
            <div></div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(SchoolMenu)