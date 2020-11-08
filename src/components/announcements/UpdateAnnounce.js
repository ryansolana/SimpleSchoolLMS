import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { updateAnnounce } from '../../store/actions/announceActions'
import { Redirect } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';

class UpdateAnnounce extends Component {

    // safe state
    state = { 
        // firebase auth included as per mapStateToProps
        title: '',
        editorState: EditorState.createEmpty(),
        contentLink: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(e.target.id)
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // save as raw for later use
        this.state.editorState = convertToRaw(this.state.editorState.getCurrentContent());
      
        //console.log(this.state)
        this.props.updateAnnounce(this.state)
        this.props.history.push('/announcements')
    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
      };

    render(){
        console.log("component rendered")
        const { auth, announce} = this.props;

        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        if (announce){
            return (
                <div className="container z-depth-1"> 
                    <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Update Announcement</h5>
                        <div className="input-field">
                            <label className="active" htmlFor="email">Announcement Title</label>
                            <input type="text" id="title" onChange={this.handleChange} defaultValue={announce.title} required/>
                        </div>
    
                        {/*
                        <div className="input-field">
                            <label htmlFor="content">Announcement Content</label>
                            <textarea id="content" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                        </div>
                        */}
    
                        <div className="input-field">
                            <label htmlFor="email">Link URL Address (optional)</label>
                            <input type="text" id="contentLink" onChange={this.handleChange}/>
                        </div>
                        
                        <Editor
                            editorState={this.state.editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={this.onEditorStateChange}
                        />
    
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0 hoverable">Create Announcement</button>
                        </div>
                    </form>
                </div>
            )
        } else{
            return(<div class="progress">
            <div class="indeterminate"></div>
        </div>)
        }
    } 
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateAnnounce: (announce) => dispatch(updateAnnounce(announce))
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
)(UpdateAnnounce)