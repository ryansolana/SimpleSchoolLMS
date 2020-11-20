import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'

const StudentSummary = ({student}) => {

    const parsedDate = student.joinDate.seconds * 1000;
    var timeStamp = new Date(parsedDate);
    var date = moment(timeStamp).format('LLL');

    return (
        
        <tr>
            <td>{student.firstName} {student.lastName}</td>
            <td>{student.email}</td>
            <td>{student.isActivated ? "True" : "False"}</td>
            <td>{date}</td>
            <td><Link to={'/manage/student/'+ student.id}><button className="btn blue">View Student</button></Link></td>
        </tr>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(StudentSummary)
