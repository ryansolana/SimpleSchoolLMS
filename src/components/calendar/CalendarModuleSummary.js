import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const CalendarModuleSummary = ({calendarModule, profile}) => {
    // for date formatting
    const m = moment(calendarModule.date, 'YYYY-MM-DD');
    const date = m.format('LL');
    var status = calendarModule.status === "Released" ? "Released" : "Due";

    return (
        <tr>
            <td>{calendarModule.weekNum}</td>
            <td >{calendarModule.title}</td>
            {status === "Released" ? <td className="text-center text-bold">{status}</td> : <td className="red-bg text-center">{status}</td>}
            <td className="text-center">{date}</td>
            {profile.isAdmin && <td><Link to={'/editCalendarModule/' + calendarModule.id}><i className="material-icons black-text text-darken-3">edit</i></Link></td>}
        </tr>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(CalendarModuleSummary)
