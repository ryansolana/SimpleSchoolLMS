import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import StudentList from './StudentList'

class StudentManagement extends Component{

    state = {
        listSortState: 0
    }

    handleClickSort = () => {
        this.state.listSortState < 2 ? this.setState({listSortState: this.state.listSortState + 1}) :
        this.setState({listSortState: 0})
    }

    componentDidMount = () => {

    }


    render(){
        const { users } = this.props

        if (users){
            return(
                <div className="dashboard container">
                    <h3 className="padding page-title">Student Management</h3>
                    <button className="btn blue" style={{ marginTop:7, marginBottom: 3}} onClick={this.handleClickSort}>Back To Student List</button>

                    <div className="row">
                        <h5>All Students List ({users && users.length - 1})</h5>
                        <br></br>
                        {
                        // all students
                        this.state.listSortState === 0 && <StudentList students={users} type={"all"} />}

                        {
                        // all activated
                        this.state.listSortState === 1 && <StudentList students={users} type={"active"} />}
                        {
                        // all activated
                        this.state.listSortState === 2 && <StudentList students={users} type={"unactive"} />}         
                        
                    </div>
    
                </div>
            )
        } else {
            return(
                <div class="progress">
                    <div class="indeterminate"></div>
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