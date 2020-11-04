import React from 'react'
import moment from 'moment'
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { Link } from 'react-router-dom'

const AnnounceSummary = ({announce}) => {

    const date = moment(announce.createdAt.toDate()).calendar()

    var contentState;
    var editorState;

    if (announce.editorState){
        contentState = convertFromRaw(announce.editorState);
        editorState = EditorState.createWithContent(contentState);
    }

    return (
        <div className="card z-depth-1 announce-summary">
            <div className="row">
                <div className="col s1">
                  <i className="material-icons grey-text text-darken-3 summary">announcement</i>
                </div>
                <div className="col s9 offset-s1">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{announce.title}</span>
                        <span className="card-subtitle">{announce.subtitle}</span> 
                    </div>
                    <div className="card-action">
                        {editorState && <div className="black-text">
                            <Editor editorState={editorState} readOnly={true} />
                        </div>}
                        <br></br>
                        {announce.contentLink && <a href={announce.contentLink} alt="/" target="_blank"><button className="btn">{announce.contentLinkName || "Link"}</button></a>}
                        <p>announce id is {announce.id}</p>
                    </div>
                </div>
            </div>
            <Link to={'/announce/' + announce.id}>
                <div className="card-action grey lighten-4 grey-text">
                    <p>Posted by {announce.authorFirstName} {announce.authorLastName}</p>
                    <p className="grey-text">{date}</p>
                </div>  
            </Link>
             
        </div>

    )
}


export default AnnounceSummary