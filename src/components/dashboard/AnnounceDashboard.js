import React, { Component } from 'react'
import AnnounceList from '../announcements/AnnounceList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

class AnnounceDashboard extends Component{
    render(){
        const { announces, profile} = this.props

        return(
            <div className="dashboard container">
                <h3 className="padding page-title">Announcements</h3>

                {profile.isAdmin ? <Link to='/createAnnounce'>
                    <button className="btn waves-effect waves-light green text-darken-1 padding-top hoverable">Create New Announcement</button>
                </Link> : <div></div>}
            
                <AnnounceList announces={announces} />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        announces: state.firestore.ordered.announces, // get from firestore
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'announces', orderBy: ['createdAt', 'desc'] },
    ])
)(AnnounceDashboard)