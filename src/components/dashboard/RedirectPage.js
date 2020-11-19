import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const RedirectPage = (props) => {
    const { auth } = props;
    if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
    if (auth){
        return (
        <div>
            <div className="container section project-details">
                <div className="card z-depth-1">
                    <div className="card-content">
                        <p>Redirecting...</p>
                    </div>
                </div>
                
            </div>
        </div>
        )
    } else {
        return (
            <div className="container center">
                <div class="progress">
                   <div class="indeterminate"></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, null)(RedirectPage)
