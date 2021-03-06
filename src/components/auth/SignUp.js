import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
    state = {
        admin: false,
        email: '',
        password: '',
        firstName: '',
        lastName:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state)
        this.props.signUp(this.state)
    }

    render(){
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/' /> // redirect to dashboard if user is not logged in
        return (
            <div className="container login-page">
                <form onSubmit={this.handleSubmit} className="white">
                    <div className="card z-depth-4">
                        <div className="card-content">
                            <i className="material-icons prefix center">how_to_reg</i>
                            <h3 className="grey-text text-darken-3 center">Register Your Account</h3>
                            <p className="center">We just need a few details from you to get started</p>
                            <br></br>
                            <div className="card-action">
                                <div className="input-field">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" onChange={this.handleChange} required/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" onChange={this.handleChange} required/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" id="firstName" onChange={this.handleChange} required/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" id="lastName" onChange={this.handleChange} required/>
                                </div>
                                <div className="input-field center">
                                    <button className="btn login-btn lighten-1 z-depth-0">Sign Up</button>
                                    <div className="red-text center">
                                        { authError ? <p>{ authError }</p> : null }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    } 
}

const mapStateToProps = (state) =>{
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
