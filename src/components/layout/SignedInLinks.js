import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {

    console.log(props.profile.admin)

    const admin = props.profile.admin ? 'Professor' : ''
    
    if (props.profile != null){
        return(
            <ul className="right">
                
                <li><p className="welcome">Logged in as, {admin} {props.profile.firstName} {props.profile.lastName}!</p>
                </li>
                
                {/*<li><NavLink to='/create'>New Project</NavLink></li>*/}
                <li><button className="btn waves-effect waves-light red" onClick={props.signOut}>Log Out</button></li>
                <li>
                    <NavLink to='/' className='btn btn-floating btn-large blue lighten-1'>
                        {props.profile.initials}
                    </NavLink>
                </li>
                <li>

                </li>
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