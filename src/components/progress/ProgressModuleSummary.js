import React from 'react'
import moment from 'moment'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressModuleSummary = ({progressModule}) => {

    return (
        <div className="card z-depth-1 progressModule-summary hoverable">
            <div className="card-content grey-text text-darken-3">
            <div className="row row-nomargin">
                <div className="col s3">
                  <i className="material-icons grey-text text-darken-3 progressMod">import_contacts</i>            
                </div>
                <div className="col s5"> 
                    <span className="card-title">Week {progressModule.weekNum}: {progressModule.title}</span>     
                    <span>{progressModule.content}</span>     
                </div>
                <div className="col s2 offset-s1 circlep-w">
                    <CircularProgressbar value={progressModule.progressPercent} text={`${progressModule.progressPercent}%`} />
                    <p className="center-align hide-on-med-and-up">{progressModule.progressPercent}% completed</p>
                </div>
            </div>
            </div>
        </div>

    )
}


export default ProgressModuleSummary