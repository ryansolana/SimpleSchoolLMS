import React from 'react'
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const CalendarModuleSummary = ({calendarModule}) => {
    // for date formatting
    const m = moment(calendarModule.date, 'YYYY-MM-DD');
    const date = m.format('LL');

    var status = calendarModule.status === "Released" ? "Released" : "Due";

    if (status === "Released"){
        return (
            <tr>
                <td>{calendarModule.weekNum}</td>
                <td>{calendarModule.title}</td>
                <td className="text-center text-bold">{status}</td>
                <td className="text-center">{date}</td>
                <td><Link to={'/updateCalendarModule/' + calendarModule.id}><i className="material-icons blue-text text-darken-3">edit</i></Link></td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td>{calendarModule.weekNum}</td>
                <td >{calendarModule.title}</td>
                <td className="red-bg text-center">{status}</td>
                <td className="text-center">{date}</td>
                <td><Link to={'/updateCalendarModule/' + calendarModule.id}><i className="material-icons blue-text text-darken-3">edit</i></Link></td>
            </tr>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps, null)(CalendarModuleSummary)
