import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import StudentList from './StudentList'
import * as firebase from 'firebase'

class StudentManagement extends Component{

    state = {
        listFilterState: 0,
        allUsers: null,
        filteredUsers: null,
        loading: true
    }

    handleClickFilter = () => {
        this.state.listFilterState < 2 ? this.setState({listFilterState: this.state.listFilterState + 1}) :
        this.setState({listFilterState: 0})
        // update filtered users
        this.getFilteredUsers(this.state.listFilterState);
    }

    componentDidMount = () => {
        var db = firebase.firestore()
        // get data first
        var docRef = db.collection("users");
        // collect data
        docRef.get().then(snap => {
            const items = []
            let i = 0;
            snap.forEach(item => {
                // by default, filter out admins for security
                if (!item.data().isAdmin){
                    items[i] = item.data();
                    i++;
                }
            })
            // will have everyone initially
            this.setState({allUsers: items, filteredUsers: items})
        }).then(()=>{
            this.setState({loading: false})
            this.getFilteredUsers()
        })
    }

    // gets filtered users based off of filter state, based off
    getFilteredUsers = () => {
        this.setState({loading: true});
        let allUsers = this.state.allUsers
        let filterState = this.state.listFilterState++ // due to state being null

        var items = []
        let i = 0;

        switch(filterState){
            // all
            case 0:
                items = []
                allUsers.forEach(item => {
                    items[i] = item;
                    i++;
                   })
                   this.setState({filteredUsers: items, listType: "All Students"})
                break;
            // activated
            case 1:
                items = []
                allUsers.forEach(item => {
                    if (item.isActivated === true){
                        items[i] = item;
                        i++;
                    }
                   })
                   this.setState({filteredUsers: items, listType: "Activated Students"})
                break;
            // unactivated
            case 2:
                items = []
                allUsers.forEach(item => {
                    if (item.isActivated === false){
                        items[i] = item;
                        i++;
                    }
                   })
                   this.setState({filteredUsers: items, listType: "Unactivated Students"})
                break;
            default:
        }

        this.setState({loading: false});
    }


    render(){
        if (!this.state.loading){
            return(
                <div className="dashboard container">
                    <h3 className="padding page-title">Student Management</h3>
                    <button className="btn blue waves-effect waves-light" style={{ marginTop:7, marginBottom: 3}} onClick={this.handleClickFilter}>Change Filter</button>

                    <div className="row">
                        
                        <br></br>
                        {
                        // all students
                            <div>
                                <h5>{this.state.listType} List</h5>
                                <StudentList students={this.state.filteredUsers}/>
                            </div>
                        }
                    </div>
    
                </div>
            )
        } else {
            return(
                <div className="container">
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
        users: state.firestore.ordered.users, // get from firestore
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users', orderBy: ['firstName', 'desc'] },
    ])
)(StudentManagement)