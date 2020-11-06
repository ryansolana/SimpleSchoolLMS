import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteCourseMat } from '../../store/actions/coursematActions'

const isActivatedUser = (props) => {

    const { activatedUser, auth, profile, id} = props;


    if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
    if (coursemat){
        return (
        <div>
            
        </div>
        )

}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteCourseMat: (coursemat) => dispatch(deleteCourseMat(coursemat))
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    const id = ownProps.match.params.id;
    const activatedUsers = state.firestore.data.activatedUsers
    const activatedUser = activatedUsers ? activatedUsers[id] : null
    return {
        activatedUser: activatedUser,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        id: ownProps.match.params.id
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'activatedUsers'}
    ])
)(CourseMatDetails)
