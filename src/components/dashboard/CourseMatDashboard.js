import React, { Component } from 'react'
import CourseMatList from '../course-material/CourseMatList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'

class CourseMatDashboard extends Component{

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
        const { coursemats, auth, profile} = this.props
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        if (!this.state.loading){
            return(
                <div className="dashboard container">
                    <h3 className="page-title padding">Course Material</h3>
    
                    {profile.isAdmin? <Link to='/createCourseMat'>
                        <button className="btn waves-effect waves-light green text-darken-1 padding-top hoverable">Create New Course Material</button>
                    </Link> : <div></div>}
                
                    <CourseMatList coursemats={coursemats} currentWeek={this.state.currentWeek} />
                </div>
            )
        } else {
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
        coursemats: state.firestore.ordered.coursemats, // get from firestore
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'coursemats', orderBy: ['createdAt', 'desc'] },
    ])
)(CourseMatDashboard)