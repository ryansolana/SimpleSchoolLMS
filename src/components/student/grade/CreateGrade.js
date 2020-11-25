import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase'

class CreateGrade extends Component {
    state = { 
        // firebase auth included as per mapStateToProps
        title: '',
        content: '',
        grade: null,
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
            } else {
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

    handleSubmit = async(e) => {
        this.setState({loading: true});

        e.preventDefault();
        
        // exclude fullName of user
        let newGrade = {
            title: this.state.title,
            content: this.state.content,
            grade: this.state.grade,
            userId: this.props.match.params.id
        }
        var db = firebase.firestore()
        db.collection('grades').doc(this.props.match.params.id).collection('gradeList').add({
            ...newGrade,
            authorFirstName: this.props.profile.firstName,
            authorLastName: this.props.profile.lastName,
            authorId: this.props.profile.id,
            createdAt: new Date()
        }).then((docRef)=>{
            db.collection('grades').doc(this.props.match.params.id).collection('gradeList').doc(docRef.id).update({
                gradeId: docRef.id
            }).then(()=>{
                console.info("completed making grade, redirecting")
                this.props.history.push('/manage/student/' + this.props.match.params.id)
            })    
        })    
    }

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        if (!this.state.loading){
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
                            <i className="material-icons prefix">rule</i>
                            <label htmlFor="grade">Grade</label>
                            <input type="number" id="grade" min="0" step="1" max="100" onChange={this.handleChange} required/>
                        </div>
    
                        <div className="input-field">
                            <i class="material-icons prefix">text_snippet</i>
                            <label htmlFor="content">Feedback Description (2400 char max)</label>
                            <textarea id="content" maxLength="2400" className="materialize-textarea" onChange={this.handleChange} required> </textarea>
                        </div>
                        
                        <div className="input-field">
                            <button className="btn green lighten-1 hoverable waves-effect">Create Grade</button>
                        </div>
                    </form>
                </div>
            )
        } else {
            return( 
                <div className="container center">
                    <h5>Creating grade...</h5>
                    <div class="progress">
                        <div class="indeterminate"></div>
                    </div>
                </div>
            )
        }
    } 
}
//  auth is now in state
const mapStateToProps = (state) =>{
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}


export default connect(mapStateToProps, null)(CreateGrade)
