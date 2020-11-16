import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class SignIn extends Component {
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
        this.props.signIn(this.state)
    }

    render(){
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/' /> // redirect to dashboard if user is not logged in
        return (
            <div className="container login-page">
                <form onSubmit={this.handleSubmit} className="white">
                    <div className="card z-depth-1">
                        <div className="card-content">
                            <h3 className="thick center">School Of Logistics Portal</h3>
                            <h6 className="grey-text text-darken-3 center">Please log in to continue.</h6>
                        </div>
                        <div className="card-action">
                            <div className="input-field">
                                <label htmlFor="email">EMAIL</label>
                                <input type="email" id="email" maxLength="30" size="30" onChange={this.handleChange}/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">PASSWORD</label>
                                <input type="password" id="password" maxLength="30" size="30" onChange={this.handleChange}/>
                            </div>
                            <div className="input-field center">
                                <button className="btn lighten-1 z-depth-0 login-btn center">Login</button>
                                <div className="red-text ">
                                    { authError ? <p>{authError}</p> : null }
                                </div>
                            </div>
                        </div>
                        <div className="card-action" style={{paddingTop: 0, paddingBottom: 0}}>
                            <div className="input-field center" style={{marginTop: 0, marginBottom: 0}}>
                                    <button className="btn login-btn"><Link to='/signup'>Don't have an account?</Link></button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
