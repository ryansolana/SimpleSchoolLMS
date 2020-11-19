import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const GradeSummary = ({grade}) => {

    // truncate down text
    let str = grade.content
    
    if (str.length > 50) {
        str = str.slice(0, 50) + '...'
    }

    console.log(grade)
    // for date formatting
    return (
        <tr>
            <td>{grade.title}</td>
            <td style={{textAlign: "left"}}>{grade.grade}</td>
            <td className="grade" style={{textAlign: "left"}}>{str}</td>
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
