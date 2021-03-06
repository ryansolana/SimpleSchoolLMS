import React, { Component } from 'react'
import GradeList from '../student/grade/GradeList'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase'

class GradeDashboard extends Component{
    constructor(props){
        super(props);

        this.state = { 
            // firebase auth included as per mapStateToProps
            grades: [],
            loading: true
        }
    }

    componentDidMount(){
        var db = firebase.firestore()

        console.log(firebase.auth().currentUser.uid)
        // get data first
        var docRef = db.collection("grades").doc(firebase.auth().currentUser.uid).collection("gradeList");

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

    render(){
        const { auth } = this.props

        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        if (!this.state.loading){
            return(
                <div className="dashboard container">
                    <h3 className="page-title padding">My Grades</h3>
    
                    <div className="row">
                        <h5>Grade List</h5>
                        {!this.state.loading && <GradeList grades={this.state.grades} />}
                    </div>
                    
                </div>
            )
        } else {
            return(
                <div className="dashboard container">
                    <h3 className="page-title padding">My Grades</h3>
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
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(GradeDashboard)