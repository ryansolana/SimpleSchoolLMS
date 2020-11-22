import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const GradeSummary = ({grade, profile}) => {

    // truncate down text
    let str = grade.content
    
    if (str.length > 50) {
        str = str.slice(0, 50) + '...'
    }

    return (
        <tr>
            <td>{grade.title}</td>
            <td style={{textAlign: "left"}}>{grade.grade}</td>
            <td className="grade" style={{textAlign: "left"}}>{str}</td>
            <td className="short"><Link to={'/grade/'+ grade.userId +'/'+ grade.gradeId} ><button className="btn">Expand</button></Link></td>
            {profile.isAdmin && <td className="short"><Link to={'/editGrade/' + grade.userId +'/' + grade.gradeId}><i className="material-icons black-text text-darken-3">edit</i></Link></td>}
        </tr>  
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(GradeSummary)
