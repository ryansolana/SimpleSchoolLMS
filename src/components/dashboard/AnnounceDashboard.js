import React, { Component } from 'react'
import AnnounceList from '../announcements/AnnounceList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class AnnounceDashboard extends Component{
    render(){
        const { announces, auth} = this.props
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        return(
            <div className="dashboard container">
                <h3 className="padding">Announcements</h3>

                <Link to='/createAnnounce'>
                    <button className="btn waves-effect waves-light blue padding-top">Create New Announcement</button>
                </Link>

                <AnnounceList announces={announces} />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        announces: state.firestore.ordered.announces, // get from firestore
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'announces', orderBy: ['createdAt', 'desc'] },
    ])
)(AnnounceDashboard)