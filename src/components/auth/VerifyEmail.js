import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import * as firebase from 'firebase'

class VerifyEmail extends Component {

    constructor(props){
        super(props);

        this.state = {
            verifyClicked: false,
            isVerified: false
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.emailVerified === true) {
              console.log('user changed..', user);
              console.log("redirecting user")
              this.setState({isVerified: true});
            }
        });
    }

    handleClick = (e) => {
        e.preventDefault();

        var user = firebase.auth().currentUser;
        // activate logic
        user.sendEmailVerification().then(function(res) {
            console.log("verification send success" + res)
          }).catch(function(error) {
            console.log("verification send failed")
          });

        // set state to clicked already once
        this.setState({verifyClicked: true})
    }

    refreshPage = ()=>{
        window.location.reload();
    }

    render(){
        const { auth, profile } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        if (this.state.isVerified) return <Redirect to='/' />

        if (auth){
            const lastLogin = parseInt(auth.lastLoginAt);
            var timeStamp = new Date(lastLogin);
            var date = moment(timeStamp).calendar();

            return (
            <div> 
                <div className="dashboard container">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <h3 className="page-title">Email Verification</h3>
                            <p>Nice to have you on board, {profile.admin ? "Professor" : ""} {profile.firstName} {profile.lastName}!</p>
                        </div>
                        <div className="card-action">
                            {!this.state.verifyClicked ? 
                                <div>
                                    <p>Please verify your e-mail <bold>{auth.email}</bold> to finish signing up for School of Logistics.</p>
                                        <br></br>
                                        <button className="btn blue waves-effect hoverable" onClick={this.handleClick}>
                                            Send Verification Email
                                        </button>
                                </div> 
                                : 
                                <div>
                                    <p>Please check your email at {auth.email} for instructions to activate your account!</p>
                                    <br></br>
                                    <button className="btn green">Verification Email Sent!</button>
                                    <br></br>
                                    <br></br>
                                    <p><bold>Checking for account activation</bold></p>
                                    <div className="row">
                                        <div className="col s2">
                                            <div class="progress">
                                                <div class="indeterminate"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            )
        } else {
            return (
                <div className="container center">
                    <p>Loading landing page...</p>
                </div>
            )
        }
    } 

}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(VerifyEmail)
