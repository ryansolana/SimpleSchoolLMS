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

        console.log(e.target)
        console.log(e.target.value)
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
                        <i className="material-icons prefix">format_list_numbered</i>
                        <label htmlFor="weekNum">Week Number</label>
                        <input type="number" id="weekNum" min="0" step="1" max="52"  onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <i class="material-icons prefix">title</i>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" maxlength="50" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <i class="material-icons prefix">description</i>
                        <label htmlFor="content">Description (optional)</label>
                        <textarea id="content" maxlength="200" className="materialize-textarea" onChange={this.handleChange} required></textarea>
                    </div>

                    <div className="input-field" onChange={this.handleChange} required>
                        <p>
                        <i className="material-icons prefix">details</i>
                        <label htmlFor="content">Status</label>
                        </p>
                        <p className="padding-radio">
                            <label>
                                <input class="with-gap" name="group1" id="status" type="radio" value="Released"/>
                                <span>Released</span>
                            </label>
                            <label>
                                <input class="with-gap" name="group1" id="status" value="Due" type="radio"/>
                                <span>Due</span>
                            </label>
                            
                        </p>

                    </div>

                    <div className="input-field">
                        <i class="material-icons prefix">date_range</i>
                        <label className="active" htmlFor="date">Calendar Module Date</label>
                        <input type="date" id="date" onChange={this.handleChange}required/>
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
