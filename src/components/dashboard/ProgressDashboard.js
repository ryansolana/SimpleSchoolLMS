import React, { Component } from 'react'
import ProgressModuleList from '../progress/ProgressModuleList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class ProgressModuleDashboard extends Component{
    render(){
        const { progressModules, auth, profile} = this.props
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        console.log(profile)
        return(
            <div className="dashboard container">
                <h3 className="padding">My Progress</h3>

                {profile.admin ? <Link to='/createProgressModule'>
                    <button className="btn waves-effect waves-light blue padding-top hoverable">Create New ProgressModulement</button>
                </Link> : <div></div>}
            
                <ProgressModuleList progressModules={progressModules} />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        progressModules: state.firestore.ordered.progressModules, // get from firestore
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'progressModules', orderBy: ['createdAt', 'desc'] },
    ])
)(ProgressModuleDashboard)