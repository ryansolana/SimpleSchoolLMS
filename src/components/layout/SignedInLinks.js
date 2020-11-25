import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    const admin = props.profile.isAdmin ? 'Professor' : ''
    
    if (props.profile != null){
        return(
            <div>  
                <ul className="right">
                    <li>
                        {props.profile.firstName ? <p className="welcome hide-on-med-and-down">Logged in as, {admin} {props.profile.firstName} {props.profile.lastName}!</p> : <div></div>}
                    </li>
                    
                    {/*<li><NavLink to='/create'>New Project</NavLink></li>*/}
                    <li><button className="btn waves-effect waves-light red" onClick={props.signOut}>Log Out</button></li>
                    <li>
                        <NavLink to='/myAccount' className='btn btn-floating btn-large blue lighten-1'>
                            {props.profile.initials}
                        </NavLink>
                    </li>
                    <li>
                    </li>
                </ul>
            </div>  
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)