import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAnnounce } from '../../store/actions/announceActions'
import { Redirect } from 'react-router-dom'

class CreateAnnounce extends Component {
    state = { 
        title: '',
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
        this.props.history.push('/')
    }

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        return (
            <div className="container z-depth-1">
                <h5 className="grey-text text-darken-3">Create New Announcement</h5>
                <form onSubmit={this.handleSubmit} className="white">
                    
                    <div className="input-field">
                        <label htmlFor="email">Title</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Announce Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create Announce</button>
                    </div>
                </form>
            </div>
        )
    } 
}

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
