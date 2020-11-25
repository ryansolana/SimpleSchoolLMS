import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class ForgotPassword extends Component {
    state = { 
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render(){
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/' /> // redirect to dashboard if user is not logged in
        return (
            <div className="container login-page">
                <form onSubmit={this.handleSubmit} className="white">
                    <div className="card z-depth-4">
                        <div className="card-content">
                            <h5 className="grey-text text-darken-3 center" style={{float: 'center'}}>Forgot your password?</h5>
                            <p className="grey-text text-darken-3 center" style={{float: 'center'}}>Please enter your email address so we can help reset your password.</p>
                        </div>
                        <div className="card-action">
                            <div className="input-field">
                                <label htmlFor="email">EMAIL</label>
                                <input type="email" id="email" maxLength="50" size="50" onChange={this.handleChange}/>
                            </div>
                            <div className="input-field center">
                                { authError ? <p className="red-text">{authError && "Failed to authenticate"}</p> : null }                       
                                <button className="btn lighten-1 z-depth-0 login-btn center">Reset Password</button>
                            </div>
                        </div>
                    </div>
                </form>
                
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(ForgotPassword)
