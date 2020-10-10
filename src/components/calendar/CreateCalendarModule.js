import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCalendarModule } from '../../store/actions/calendarActions'
import { Redirect } from 'react-router-dom'

class CreateCalendarModule extends Component {
    state = { 
        // firebase auth included as per mapStateToProps
        weekNum: '',
        title: '',
        content: '',
        status: '',
        date: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state)
        this.props.createCalendarModule(this.state)
        this.props.history.push('/calendar')
    }

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        return (
            <div className="container z-depth-1">
                
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create New Calendar Module</h5>
                    <div className="input-field">
                        <label htmlFor="weekNum">Calendar Module Week Number</label>
                        <input type="number" id="weekNum" min="0" step="1" max="52"  onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Calendar Module Title</label>
                        <input type="text" id="title" maxlength="10" o nChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Calendar Module Description (optional)</label>
                        <textarea id="content" maxlength="200" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                    </div>
                    <div className="input-field">
                        <label htmlFor="status">Calendar Module Status</label>
                        <input type="text" id="status" maxlength="10" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="date">Calendar Module Date</label>
                        <input type="date" id="calendarDate" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0 hoverable">Create Calendar Module</button>
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
        createCalendarModule: (announce) => dispatch(createCalendarModule(announce))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCalendarModule)
