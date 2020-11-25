import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase/app';

class ProfilePage extends Component {
    state = { 
        // for password changing
        passwordSuccess: '',
        passwordFail: null,
        isReAuth: false,
        changePasswordEnabled: false,
        inputtedPassword: "",

        oldPass: '',
        newPass: '',
        passErr: ''
    }

    enableChangePassword = () =>{
        if(!this.state.changePasswordEnabled){
            this.setState({changePasswordEnabled: true})
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log("handleChange called for: " + e.target.id);
        console.log(e.target.value);
    }

    changePassword = (e) =>{
        e.preventDefault();
        var user = firebase.auth().currentUser

        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email, 
            this.state.oldPass
        );

        var newPass = this.state.newPass

        console.log(newPass)

        // reauthenticate user first
        user.reauthenticateWithCredential(credential).then(() => {
            console.log("Successfully reauth")

            user.updatePassword(newPass).then(() =>{
                console.log("Successfully changed pass to: " + newPass)
            }).catch((error)=> {
                console.log("Failed to change pass", error)
            }).then(()=>{
                this.setState({passwordSuccess: "Successfully changed password!", passwordChanged: false});
            })
        }).catch((error) => {
            console.log("error ran into", error)
            this.setState({passwordSuccess: "Please make sure your password is correct!", passwordChanged: true});
        })
    }

    render(){ 
        const { auth, profile } = this.props

        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        return(
            <div className="dashboard container">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <h3>Account Page</h3>
                        <br></br>
                        <p><bold>First Name: </bold> {profile.firstName}</p>
                        <p><bold>Last Name: </bold> {profile.lastName}</p>
                        <p><bold>Email: </bold> {auth.email}</p>
                        <br></br>
                    </div>
                    <div className="card-action" style={{paddingTop: 0}}>
                        <br></br>
                        {!this.state.changePasswordEnabled && <button className="btn blue" onClick={this.enableChangePassword}>Change Password</button>}

                        {this.state.changePasswordEnabled && 
                            <form onSubmit={this.changePassword} style={{marginTop:0, paddingLeft: 0}}>
                                <p><bold>Change Password</bold></p>
                                <div className="input-field">
                                    <label htmlFor="password">Enter existing password</label>
                                    <input type="password" id="oldPass" maxLength="30" size="30" onChange={this.handleChange}/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="password">Enter new password</label>
                                    <input type="password" id="newPass" maxLength="30" size="30" onChange={this.handleChange}/>
                                </div>
                                {
                                    this.state.oldPass.length >= 6 &&
                                    this.state.newPass.length >= 6 &&
                                    <button className="btn green" type="submit">Confirm New Password</button>
                                }
                            </form>
                        }

                    {this.state.passwordSuccess && <p>{this.state.passwordSuccess}</p>}

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(ProfilePage)