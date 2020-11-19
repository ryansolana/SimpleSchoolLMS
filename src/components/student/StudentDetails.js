import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'
import GradeList from '../student/grade/GradeList'

class StudentDetails extends Component{

    constructor(props){
        super(props);

        this.state = { 
            // firebase auth included as per mapStateToProps
            grades: [],
            loading: true,
            isConfirm: false,
            isActivated: true
        }
    }

    componentDidMount(){
        var db = firebase.firestore()

        // GET PROFILE
        // get data first
        var docRef = db.collection("users").doc(this.props.match.params.id);
        var data;

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
            this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                isActivated: data.isActivated,
                joinDate: data.joinDate,
                dateActivated: data.dateActivated
            })
        })

        // GET GRADES
        // get data first from this page id
        var docRef = db.collection("grades").doc(this.props.match.params.id).collection("gradeList");

        // collect data
        docRef.get().then(snap => {
            const items = []
            let i = 0;
            snap.forEach(item => {
             items[i] = item.data()
             i++;
            })
            this.setState({grades: items})
        }).then(()=>{
            console.log(this.state.grades)
            this.setState({loading: false})
        })
    }

    toggleConfirm = () =>{
        this.setState({isConfirm: !this.state.isConfirm})
    }

    toggleUserActivation = () =>{
        var db = firebase.firestore()
        
        var docRef = db.collection('users').doc(this.props.match.params.id);

        docRef.update({
            isActivated: !this.state.isActivated,
            dateActivated: new Date()
        }).then(()=>{
            this.setState({isActivated: !this.state.isActivated})
            this.toggleConfirm();
            !this.state.isActivated ? console.log("Deactivated user") : console.log("Activated user")
        }).catch((err)=>{
            console.log(err)
        })  
    }

    render(){
        const { auth } = this.props

        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
        if (!this.state.loading){
            const parsedDate = this.state.joinDate.seconds * 1000;
            var timeStamp = new Date(parsedDate);
            var date = moment(timeStamp).format('LLL');

            return (
                <div>
                    <div className="container section student-details">
                    <Link to='/studentManagement'><button className="btn blue" style={{ marginTop:7, marginBottom: 3}}>Back To Student List</button></Link>
                        <div className="card z-depth-0">
                            <div className="card-content">
                                <div className="row">  
                                    <h4 style={{ marginTop:0, marginBottom: 20}}>Student Details</h4>
                                    <p><bold>Full Name: </bold> {this.state.firstName} {this.state.lastName}</p>
                                    <p><bold>Email: </bold>{this.state.email}</p>
                                    <p><bold>Activated?: </bold>{this.state.isActivated ? "True" : "False"}</p>
                                    <p><bold>Register Date: </bold>{date}</p>
                                    {this.state.dateActivated && <p><bold>Last Deactivated/Activated: </bold>{moment(new Date(this.state.dateActivated.seconds*1000)).format('LLL')}</p>}
                                    
                                </div>
                            </div>
                            <div className="card-action white lighten-4 black-text">
                                <h5>Academic Actions</h5>
                                <Link to={'/manage/student/createGrade/' + this.props.match.params.id}><button className="btn green" style={{ marginTop:7, marginBottom: 3}}>Create Submission Grade</button></Link>
                                <br></br>
                                <h5>Account Actions</h5>
                                {!this.state.isConfirm ? <button className={this.state.isActivated ? "btn red" : "btn green"} style={{ marginTop:7, marginBottom: 3}} onClick={this.toggleConfirm}>{this.state.isActivated ? "Deactivate" : "Activate"} Student</button> 
                                    :
                                    <div>
                                        <p>Are you sure you want to {!this.state.isActivated ? <bold>activate</bold> : <bold>deactivate</bold>} student {this.state.firstName} {this.state.lastName}?</p>
                                        <button className="btn green" style={{ marginTop:7, marginBottom: 3, marginRight: 3}} onClick={this.toggleUserActivation}>Yes</button>
                                        <button className="btn red" style={{ marginTop:7, marginBottom: 3}} onClick={this.toggleConfirm}>No</button>
                                    </div>
                                    }

                            </div>
                            <div className="card-action white lighten-4 black-text">
                                <h5>Student Grades</h5>
                                {!this.state.loading && <GradeList grades={this.state.grades} />}
                            </div>
                        </div>  
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container center">
                    <h5>Loading student...</h5>
                    <div class="progress">
                        <div class="indeterminate"></div>
                    </div>
                </div>
            )
        }
    }

    
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default
    connect(mapStateToProps, null)(StudentDetails)
