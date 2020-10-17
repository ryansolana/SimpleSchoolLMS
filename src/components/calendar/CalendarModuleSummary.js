import React from 'react'
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment'

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
            </tr>
        )
    } else {
        return (
            <tr>
                <td>{calendarModule.weekNum}</td>
                <td >{calendarModule.title}</td>
                <td className="red-bg text-center">{status}</td>
                <td className="text-center">{date}</td>
            </tr>
        )
    }
}


export default CalendarModuleSummary