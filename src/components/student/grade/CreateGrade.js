import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGrade } from '../../../store/actions/gradeActions'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase'

class CreateGrade extends Component {
    state = { 
        // firebase auth included as per mapStateToProps
        title: '',
        content: '',
        userId: this.props.match.params.id,

        // separate from submission obj
        fullName: '',
        
    }

    componentDidMount(){
        var db = firebase.firestore()

        // get data first
        var docRef = db.collection("users").doc(this.props.match.params.id);
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
            this.setState({fullName: data.firstName + ' ' + data.lastName})
        })
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        // exclude fullName of user
        var newGrade = {
            title: this.state.title,
            content: this.state.content,
            userId: this.state.userId
        }
        console.log(newGrade)
        this.props.createGrade(this.state, this.props.match.params.id)
        //this.props.history.push('/manage/student/' + this.props.match.params.id)
    }

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        return (
            <div className="container z-depth-1">
                
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create New Grade for Student {this.state.fullName}</h5>
                    <div className="input-field">
                        <i class="material-icons prefix">title</i>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" maxLength="100" onChange={this.handleChange} required/>
                    </div>
                    <div className="input-field">
                        <i class="material-icons prefix">Feedback</i>
                        <label htmlFor="content">Description (optional, 2400 char max)</label>
                        <textarea id="content" maxLength="2400" className="materialize-textarea" onChange={this.handleChange} required> </textarea>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">format_list_numbered</i>
                        <label htmlFor="grade">Grade</label>
                        <input type="number" id="grade" min="0" step="10" max="100" onChange={this.handleChange} required/>
                    </div>

                    <div className="input-field">
                        <button className="btn green lighten-1 hoverable waves-effect">Create Grade</button>
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
        createGrade: (announce, userId) => dispatch(createGrade(announce, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGrade)
