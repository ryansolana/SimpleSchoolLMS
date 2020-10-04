import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProgressModule } from '../../store/actions/progressActions'
import { Redirect } from 'react-router-dom'

class CreateProgressModule extends Component {
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
        this.props.createProgressModule(this.state)
        this.props.history.push('/progress')
    }

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        return (
            <div className="container z-depth-1">
                
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create New Progress Module</h5>
                    <div className="input-field">
                        <label htmlFor="email">Progress Module Title</label>
                        <input type="text" id="title" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Progress Module Subtitle</label>
                        <input type="text" id="subtitle" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Progress Module Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0 hoverable">Create Progress Module</button>
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
        createProgressModule: (announce) => dispatch(createProgressModule(announce))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProgressModule)
