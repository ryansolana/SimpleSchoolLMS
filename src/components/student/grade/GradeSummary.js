import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const GradeSummary = ({grade}) => {
    console.log(grade)
    // for date formatting
    return (
        <tr>
            <td>{grade.title}</td>
            <td style={{textAlign: "left"}}>{grade.grade}</td>
            <td className="grade" style={{textAlign: "left"}}>{grade.content}</td>
            <td><button className="btn">Expand</button></td>
        </tr>
        
    )
    
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(GradeSummary)
