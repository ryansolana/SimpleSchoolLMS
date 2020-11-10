import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCourseMat } from '../../store/actions/coursematActions'
import { Redirect } from 'react-router-dom'

class CreateCourseMat extends Component {
    constructor(props){
        super(props);

        this.state = { 
            // firebase auth included as per mapStateToProps
            title: '',
            subtitle: '',
            content: '',
            textlink: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state)
        this.props.createCourseMat(this.state)
        this.props.history.push('/course-materials')
    }

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        return (
            <div className="container z-depth-1">
                
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create New Course Material</h5>
                    <div className="input-field">
                        <label htmlFor="email">Course Material Title</label>
                        <input type="text" id="title" onChange={this.handleChange} maxLength="100" required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Course Material Subtitle</label>
                        <input type="text" id="subtitle" onChange={this.handleChange} maxLength="100" required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Course Material Description (2400 char max)</label>
                        <textarea id="content" className="materialize-textarea" maxLength="2400" onChange={this.handleChange} required></textarea>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="email">Course Material Link (with https://)</label>
                        <input type="text" id="textlink" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0 hoverable">Create Course Material</button>
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
        createCourseMat: (coursemat) => dispatch(createCourseMat(coursemat))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourseMat)
