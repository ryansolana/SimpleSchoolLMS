import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteAnnounce } from '../../store/actions/announceActions'
import { Editor, EditorState, convertFromRaw } from "draft-js";

const AnnounceDetails = (props) => {

    const deleteHandler = (id) =>{
        deleteAnnounce(id); 
        props.history.push('/announcements');
    }

    const { announce, auth, profile, deleteAnnounce, id} = props;

    if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
    var contentState;
    var editorState;

    try {
        if (announce.editorState && true){
            contentState = convertFromRaw(announce.editorState);
            editorState = EditorState.createWithContent(contentState);
        }
    } catch(err) {
        console.log(err)
    }

    if (announce){
        return (
        <div>
            <div className="container section announce-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <div className="row">
                            <span className="card-title">{announce.title}</span>
                            <span className="card-subtitle">{announce.subtitle}</span> 
                        </div>
                    </div>

                    <div className="card-action"> 
                        {editorState && <div className="black-text">
                            <Editor editorState={editorState} readOnly={true} />
                        </div>}
                        <br></br>
                        {announce.contentLink && <a href={announce.contentLink} alt="/" target="_blank"><button className="btn">Link</button></a>}
                    </div>

                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {announce.authorFirstName} {announce.authorLastName}</div>
                        <div>{moment(announce.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
                {
                    profile.admin && <div>
                        <button className="btn red" onClick={() => deleteHandler(id)}>Delete this announcement</button>
                        &nbsp;
                        <button className="btn orange">Edit this announcement</button>
                        
                        </div>     
                }
            </div>
        </div>
        )
    } else {
        return (
            <div className="container center">
                <h5>Loading announcement...</h5>
                <div class="progress">
                    <div class="indeterminate"></div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteAnnounce: (announce) => dispatch(deleteAnnounce(announce))
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log(state)
    const id = ownProps.match.params.id;
    const announces = state.firestore.data.announces
    const announce = announces ? announces[id] : null
    return {
        announce: announce,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        id: ownProps.match.params.id
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'announces'}
    ])
)(AnnounceDetails)
