import React, { Component } from 'react'
import SubmissionList from '../submissions/SubmissionList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'

class SubmissionDashboard extends Component{
    state = {
        currentWeek: 0,
        loading: true
    }

    componentDidMount(){
        // get currentweek
        var db = firebase.firestore()
        var data;
        // get data first
        var docRef = db.collection("schoolSettings").doc("courseSettings");
        // collect data
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                data = doc.data();
                // reload when found with new state
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        }).then(() =>{
            if (data){
                this.setState({
                    currentWeek: data.currentWeek,
                    loading: false
                })
                console.log(this.state)
            }
        }) 
    }



    render(){
        const { submissions, auth, profile} = this.props
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        if(!this.state.loading){
            return(
                <div className="dashboard container">
                    <h3 className="page-title padding">Submissions</h3>
    
                    {profile.isAdmin ? <Link to='/createSubmission'>
                        <button className="btn waves-effect waves-light green text-darken-1 padding-top hoverable">Create New Submission Dropbox</button>
                    </Link> : <div></div>}
                
                    <SubmissionList submissions={submissions} currentWeek={this.state.currentWeek} />
                </div>
            )
        } else{
            return(
                <div className="container center">
                    <h5>Loading dashboard...</h5>
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        submissions: state.firestore.ordered.submissions, // get from firestore
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'submissions', orderBy: ['createdAt', 'desc'] },
    ])
)(SubmissionDashboard)