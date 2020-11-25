import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase'

class UpdateGrade extends Component {

    constructor(props){
        super(props);

        this.state = { 
            // firebase auth included as per mapStateToProps
            title: '',
            grade: '',
            content: '',
            loading: true
        }
    }

    componentDidMount(){
        var db = firebase.firestore()
        const id = this.props.match.params.id
        const gid = this.props.match.params.gid

        var docRef = db.collection("grades").doc(id).collection("gradeList").doc(gid);
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
            this.setState({title: data.title, grade: data.grade, content: data.content, 
                authorFirstName: data.authorFirstName, authorLastName: data.authorLastName,
            createdAt: data.createdAt, loading: false})
        
        })
        
    }

    deleteHandler = async() =>{
        var db = firebase.firestore()
        db.collection("grades").doc(this.props.match.params.id).collection("gradeList").doc(this.props.match.params.gid).delete()
            .then(()=>{
                console.info("Deleted grade")
                this.props.history.push('/manage/student/' + this.props.match.params.id)
            }
        )
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

        console.log(e.target.id + " is now " + e.target.value)
    }

    handleSubmit = (e) => {
        var db = firebase.firestore()
        e.preventDefault();
        
        let newGrade = {title: this.state.title, grade: this.state.grade, content: this.state.content, 
            authorFirstName: this.state.authorFirstName, authorLastName: this.state.authorLastName,
        createdAt: this.state.createdAt}

        db.collection("grades").doc(this.props.match.params.id).collection("gradeList").doc(this.props.match.params.gid).update({
            ...newGrade,
            authorFirstName: this.props.profile.firstName,
            authorLastName: this.props.profile.lastName,
            authorId: this.props.profile.id
        }).then(()=>{
            console.info("Updated grade")
            this.props.history.push('/manage/student/' + this.props.match.params.id);
        }).catch((err)=>{
            console.info("Failed to update grade")
        })
    }

    render(){
        const { auth } = this.props;

        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        if (!this.state.loading){
            return(
            <div className="container z-depth-1"> 
            <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Edit Grade</h5>
                <br></br>
                <div className="input-field">
                    <i className="material-icons prefix">title</i>
                    <label className="active" htmlFor="email">Grade Title</label>
                    <input type="text" id="title" maxLength="100" onChange={this.handleChange} defaultValue={this.state.title} required/>
                </div>

                <div className="input-field">
                    <i className="material-icons prefix">rule</i>
                    <label className="active" htmlFor="grade">Grade</label>
                    <input type="number" id="grade" min="0" step="1" max="100" onChange={this.handleChange} defaultValue={this.state.grade}required/>
                </div>

                <div className="input-field">
                    <i className="material-icons prefix">text_snippet</i>
                    <label className="active" htmlFor="email">Description (2400 char max)</label>
                    <input type="text" id="content" maxLength="2400" onChange={this.handleChange} defaultValue={this.state.content} required/>
                </div>

                <div className="input-field">
                    <div className="row">
                        <div className="col s9">
                            <button className="btn green lighten-1 hoverable waves-effect">Confirm Changes</button>
                        </div>
                        <div className="col s3">
                            <button className="btn red hoverable waves-effect" onClick={() => this.deleteHandler(this.props.match.params.id)}>Delete This</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>)
        } else {
            return(
                <div className="container">
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
          )
        }
    } 
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps, null)(UpdateGrade)