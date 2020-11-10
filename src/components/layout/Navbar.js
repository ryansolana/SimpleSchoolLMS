import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import SchoolLinks from './SchoolLinks'
import { connect } from 'react-redux'


const Navbar = (props) => {
    const { auth, profile } = props
    console.log("email verified status: " + auth.emailVerified)
    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks/>

    const schoolLinks = auth.uid && auth.emailVerified ? 
        <div>
            <nav className="nav-wrapper darken-3 grey">
                <div className="container">
                    {/* School Menu Links Start */}
                    <SchoolLinks profile={profile}/>
                </div>
            </nav>
        </div> : <div></div>

    if (auth.uid){
        return(
            <div>
                <nav className="nav-wrapper nav-wrapper-blue">
                    <div className="container">
                        <Link to='/' className="brand-logo left"><img src="/img/logo.png" alt="yeah"></img></Link>
                        { links }
        
                    </div>
                </nav>
                <nav className="nav-wrapper nav-wrapper-grey hoverable">
                    {/* School Menu Goes Below*/}
                    <div className="hide-on-med-and-down">
                        { schoolLinks }
                    </div>
                    <a href="#" data-target="slide-out" className="sidenav-trigger show-on-small"><i className="material-icons">menu</i></a>
                    <ul id="slide-out" className="sidenav">
                        { schoolLinks }
                    </ul>   
                </nav>      

                
            </div>
        )
    } else{
        return (
            <nav className="nav-wrapper nav-wrapper-blue">
                <div className="container">
                    <Link to='/' className="brand-logo left"><img src="/img/logo.png" alt="yeah"></img></Link>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)