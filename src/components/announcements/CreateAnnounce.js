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
        content: '',
        //editorState: EditorState.createEmpty(),
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
       // this.state.editorState = convertToRaw(this.state.editorState.getCurrentContent());
      
        //console.log(this.state)
        this.props.createAnnounce(this.state)
        this.props.history.push('/announcements')
    }

    /*
    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
      };

    */

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        return (
            <div className="container z-depth-1"> 
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="black-text text-darken-5">Create New Announcement</h5>
                    <div className="input-field">
                        <label htmlFor="email">Announcement Title</label>
                        <input type="text" id="title" onChange={this.handleChange} required/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="content">Announcement Content (400 words max)</label>
                        <textarea 
                            rows="2" 
                            cols="200"
                            id="content" 
                            className="materialize-textarea" 
                            onChange={this.handleChange} 
                            max="400" 
                            required></textarea>
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">Link URL Address</label>
                        <input type="text" id="contentLink" onChange={this.handleChange}/>
                    </div>
                    
                    {/* 
                        <Editor
                        editorState={this.state.editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}/>
                    */}
                    
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
