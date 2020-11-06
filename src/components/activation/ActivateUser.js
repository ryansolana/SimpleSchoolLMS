import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAnnounce } from '../../store/actions/announceActions'
import { Redirect } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';

class CreateAnnounce extends Component {
    state = { 
        // firebase auth included as per mapStateToProps
        title: '',
        subtitle: '',
        content: '',
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

        // save as string for later use
        this.state.content = JSON.stringify(this.state.editorState);
        // save as raw for later use
        this.state.editorState = convertToRaw(this.state.editorState.getCurrentContent());

        //console.log(this.state)
        this.props.createAnnounce(this.state)
        this.props.history.push('/announcements')
        
    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
        console.log(convertToRaw(this.state.editorState.getCurrentContent()));
      };

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        return (
            <div className="container z-depth-1"> 
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Activate A New User</h5>
                <h3 className="grey-text text-darken-3">List of Users</h3>
                    <div className="input-field">
                        <label htmlFor="email">Announcement Title</label>
                        <input type="text" id="title" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Announcement Subtitle</label>
                        <input type="text" id="subtitle" onChange={this.handleChange} required/>
                    </div>
                    {/*
                    <div className="input-field">
                        <label htmlFor="content">Announcement Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                    </div>
                    */}

                    <div className="input-field">
                        <label htmlFor="email">Link Title (optional)</label>
                        <input type="text" id="contentLinkName" onChange={this.handleChange}/>
                    </div>

                    { this.state.contentLinkName && <div className="input-field">
                        <label htmlFor="email">Link URL Address</label>
                        <input type="text" id="contentLink" onChange={this.handleChange}/>
                    </div> }
                    
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
    } 
}
//  auth is now in state
const mapStateToProps = (state) =>{
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        createAnnounce: (announce) => dispatch(createAnnounce(announce))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAnnounce)
