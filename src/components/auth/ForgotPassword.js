import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase'

class ForgotPassword extends Component {
    state = { 
        email: '',
        password: '',
        emailSentError: false,
        emailSent: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        var auth = firebase.auth();

        if (!this.state.emailSent){
            e.preventDefault();
            auth.sendPasswordResetEmail(this.state.email).then(() =>{
                this.setState({emailSent: true})
            }).catch(function(error) {
                this.setState({emailSentError: true})
            });
        }
    }

    render(){
        const { auth } = this.props;
        if (auth.uid) return <Redirect to='/' /> // redirect to dashboard if user is not logged in
        return (
            <div className="container login-page">
                <form onSubmit={this.handleSubmit} className="white">
                    <div className="card z-depth-4">
                        <div className="card-content">
                            <i className="material-icons prefix center">help</i>
                            {!this.state.emailSent ? 
                                <div>
                                    <h5 className="grey-text text-darken-3 center" style={{float: 'center'}}>Forgot your password?</h5>
                                    <p className="grey-text text-darken-3 center" style={{float: 'center'}}>Please enter your email address so we can help reset your password.</p>
                                </div> : 
                                <div>
                                    <h5 className="grey-text text-darken-3 center" style={{float: 'center'}}>Please check your email!</h5>
                                    <p className="grey-text text-darken-3 center" style={{float: 'center'}}>We've sent you an email containing information on how to reset your password.</p>
                                </div>
                            }
                        </div>
                        <div className="card-action">
                            <div className="input-field">
                                {!this.state.emailSent && <div>
                                    <label htmlFor="email">EMAIL</label>
                                    <input type="email" id="email" maxLength="100" onChange={this.handleChange}/>
                                </div>
                                }
                            </div>
                            <div className="input-field center">                  
                                {
                                    !this.state.emailSent && this.state.email.length > 1 ? <button className="btn lighten-1 z-depth-0 login-btn center">Reset Password</button> :
                                    <button className="btn lighten-1 z-depth-0 login-btn center disabled">Reset Password</button>
                                }
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
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(ForgotPassword)
