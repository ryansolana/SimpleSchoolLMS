import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCalendarModule, deleteCalendarModule } from '../../store/actions/calendarActions'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase'

class UpdateCalendarModule extends Component {

    constructor(props){
        super(props);

        this.state = { 
            // firebase auth included as per mapStateToProps
            weekNum: '',
            title: '',
            content: '',
            status: '',
            date: ''
        }
    }

    deleteHandler = (id) =>{
        const { deleteCalendarModule } = this.props;
        console.log("delete handler id: " + id)
        deleteCalendarModule(id); 
        this.props.history.push('/calendar');
        console.log("delete handler called")
    }

    componentDidMount(){
        var db = firebase.firestore()

        // get data first
        var docRef = db.collection("calendarModules").doc(this.props.match.params.id);
        var data;

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                data = doc.data();
                // reload when found with new state
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        }).then(() =>{
            this.setState({
                weekNum: data.weekNum,
                title: data.title,
                content: data.content,
                status: data.status,
                date: data.date
            })
        }) 
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state)
        this.props.updateCalendarModule(this.state, this.props.match.params.id)
        this.props.history.push('/calendar')
    }

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        return (
            <div className="container z-depth-1">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Edit Calendar Module</h5>
                    <br></br>
                    <div className="input-field">
                        <i className="material-icons prefix">format_list_numbered</i>
                        <label className="active" htmlFor="weekNum">Week Number</label>
                        <input type="number" id="weekNum" min="0" step="1" max="52"  onChange={this.handleChange} defaultValue={this.state.weekNum} required/>
                    </div>
                    <div className="input-field">
                        <i class="material-icons prefix">title</i>
                        <label className="active" htmlFor="title">Title</label>
                        <input type="text" id="title" maxlength="50" onChange={this.handleChange} defaultValue={this.state.title} required/>
                    </div>
                    <div className="input-field">
                        <i class="material-icons prefix">description</i>
                        <label className="active" htmlFor="content">Description (optional)</label>
                        <textarea id="content" maxlength="200" className="materialize-textarea" onChange={this.handleChange} defaultValue={this.state.content} required></textarea>
                    </div>

                    <div className="input-field" onChange={this.handleChange} defaultValue={this.state.status} required>
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
                        <input type="date" id="date" onChange={this.handleChange} defaultValue={this.state.date} required/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0 hoverable">Confirm Changes</button>
                    </div>
                </form>
                <button className="btn red" onClick={() => this.deleteHandler(this.props.match.params.id)}>Delete this module</button>
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
        updateCalendarModule: (calendarModule, id) => dispatch(updateCalendarModule(calendarModule, id)),
        deleteCalendarModule: (calendarModule) => dispatch(deleteCalendarModule(calendarModule))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCalendarModule)
