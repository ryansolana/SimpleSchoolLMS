import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteAnnounce, updateAnnounce } from '../../store/actions/announceActions'
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { Link } from 'react-router-dom'

const AnnounceDetails = (props) => {
    const { announce, auth, profile, deleteAnnounce, id} = props;

    const deleteHandler = (id) =>{
        deleteAnnounce(id); 
        props.history.push('/announcements');
    }
    
    console.log(announce)

    if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
    
    var editorState = EditorState.createEmpty();

    // attempt to get data, if data null it will be empty
    try {
        if (announce.editorState && true){
            editorState = EditorState.createWithContent(convertFromRaw(announce.editorState));
        }
    } catch(err) {
        console.log(err)
    }

    if (announce){
        return (
        <div>
            <div className="container section announce-details">
                <div className="card z-depth-2">
                    <div className="card-content">
                        <div className="row">
                            <span className="card-title">{announce.title}</span>
                            <div>Posted by {announce.authorFirstName} {announce.authorLastName}, {moment(announce.createdAt.toDate()).calendar()}</div>
                        </div>
                    </div>

                    <div className="card-action"> 
                        <p>{announce.content}</p>
                        <br></br>
                        {announce.contentLink && announce.contentLink !== "" && <a href={announce.contentLink} alt="/" target="_blank"><button className="btn">Link</button></a>}
                    </div>
                </div>

                {
                profile.admin && <div>
                    <button className="btn red" onClick={() => deleteHandler(id)}>Delete this announcement</button>
                    &nbsp;
                    <button className="btn orange"><Link to={'/editAnnounce/' + id}><div className="white-text">Edit this announcement</div></Link></button>
                    
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
