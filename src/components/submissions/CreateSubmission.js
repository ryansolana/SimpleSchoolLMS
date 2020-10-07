import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSubmission } from '../../store/actions/submissionActions'
import { Redirect } from 'react-router-dom'

class CreateSubmission extends Component {
    state = { 
        // firebase auth included as per mapStateToProps
        title: '',
        subtitle: '',
        content: '',
        textlink: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state)
        this.props.createSubmission(this.state)
        this.props.history.push('/submissions')
    }

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        return (
            <div className="container z-depth-1">
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create New Submission</h5>
                    <div className="input-field">
                        <label htmlFor="email">Submission Title</label>
                        <input type="text" id="title" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Submission Subtitle</label>
                        <input type="text" id="subtitle" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Submission Description</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Submission Dropbox Link (with https://)</label>
                        <input type="text" id="textlink" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0 hoverable">Create Submission</button>
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
        createSubmission: (submission) => dispatch(createSubmission(submission))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubmission)
