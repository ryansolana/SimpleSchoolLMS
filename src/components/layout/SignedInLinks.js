import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    
    if (props.profile != null){
        return(
            <ul className="right">
                <li className="userDisplay"><p className="welcome">Welcome back, Professor {props.profile.firstName} {props.profile.lastName}!</p>
                </li>
                
                {/*<li><NavLink to='/create'>New Project</NavLink></li>*/}
                <li><button className="btn waves-effect waves-light red" onClick={props.signOut}>Log Out</button></li>
                <li><NavLink to='/' className='btn btn-floating btn-large blue lighten-1'>
                    {props.profile.initials}
                </NavLink></li>
            </ul>
        )
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)