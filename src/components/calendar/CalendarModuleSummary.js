import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CalendarModuleSummary = ({calendarModule}) => {

    return (
        <div className="card z-depth-1 calendarModule summary">
            <div className="card-content grey-text text-darken-3">
                <div className="row row-nomargin">
                    <div className="col s3">
                    <i className="material-icons grey-text text-darken-3 calendarMod">import_contacts</i>            
                    </div>
                    <div className="col s5"> 
                        <span className="card-title">Week {calendarModule.weekNum}: {calendarModule.title}</span>     
                        <span>{calendarModule.content}</span>     
                    </div>
                    <div className="col s2 offset-s1 circlep-w">
                        <CircularProgressbar value={calendarModule.calendarPercent} text={`${calendarModule.calendarPercent}%`} />
                        <p className="center-align hide-on-med-and-up">{calendarModule.calendarPercent}% completed</p>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default CalendarModuleSummary