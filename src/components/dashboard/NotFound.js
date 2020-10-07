import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const NotFound = (props) => {
    const { auth } = props;
    if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
    if (auth){
        return (
        <div>
            <div className="container section project-details">
                <div className="card z-depth-1">
                    <div className="card-content">
                        <span className="card-title bold-text">Error 404</span>
                        <p>Sorry, we couldn't find the page you were looking for!</p>
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

export default connect(mapStateToProps, null)(NotFound)
