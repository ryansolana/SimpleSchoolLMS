import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAnnounce } from '../../store/actions/announceActions'
import { Redirect } from 'react-router-dom'

class CreateAnnounce extends Component {
    state = { 
        // firebase auth included as per mapStateToProps
        title: '',
        subtitle: '',
        content: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state)
        this.props.createAnnounce(this.state)
        this.props.history.push('/announcements')
    }

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        return (
            <div className="container z-depth-1">
                
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create New Announcement</h5>
                    <div className="input-field">
                        <label htmlFor="email">Announcement Title</label>
                        <input type="text" id="title" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Announcement Subtitle</label>
                        <input type="text" id="subtitle" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Announcement Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                    </div>
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
