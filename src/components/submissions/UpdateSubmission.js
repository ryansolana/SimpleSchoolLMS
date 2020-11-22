import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSubmission, deleteSubmission } from '../../store/actions/submissionActions'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase'

class UpdateSubmission extends Component {
    constructor(props){
        super(props);

        this.state = { 
            // firebase auth included as per mapStateToProps
            title: '',
            subtitle: '',
            content: '',
            textlink: '',
            loading: true
        }
    }

    componentDidMount(){
        var db = firebase.firestore()

        // get data first
        var docRef = db.collection("submissions").doc(this.props.match.params.id);
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
                title: data.title,
                subtitle: data.subtitle,
                content: data.content,
                textlink: data.textlink,
                loading: false
            })
        }) 
    }

    deleteHandler = (id) =>{
        this.props.deleteSubmission(id); 
        this.props.history.push('/submissions');
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const newSub = {
            title: this.state.title,
            subtitle: this.state.subtitle,
            content: this.state.content,
            textlink: this.state.textlink
        }

        this.props.updateSubmission(newSub, this.props.match.params.id)
        this.props.history.push('/submissions')
    }

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        if (!this.state.loading){
            return (
                <div className="container z-depth-1">
                    <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create New Submission</h5>
                        <div className="input-field">
                            <i className="material-icons prefix">title</i>
                            <label className="active" htmlFor="email">Submission Title</label>
                            <input type="text" id="title" maxLength="100" onChange={this.handleChange} defaultValue={this.state.title}  required/>
                        </div>
                        <div className="input-field">
                            <i className="material-icons prefix">subtitles</i>
                            <label className="active" htmlFor="email">Submission Subtitle</label>
                            <input type="text" id="subtitle" maxLength="100" onChange={this.handleChange} defaultValue={this.state.subtitle}required/>
                        </div>
                        <div className="input-field">
                            <i className="material-icons prefix">description</i>
                            <label className="active" htmlFor="content">Submission Description (2400 char max)</label>
                            <textarea id="content" className="materialize-textarea" maxLength="2400" onChange={this.handleChange} defaultValue={this.state.content} required></textarea>
                        </div>
                        <div className="input-field">
                            <i className="material-icons prefix">insert_link</i>
                            <label className="active" htmlFor="email">Submission Dropbox Link (with https://)</label>
                            <input type="text" id="textlink" maxLength="2400" onChange={this.handleChange} defaultValue={this.state.textlink} required/>
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
                </div>
            )
        } else {
            return(
                <div className="container center">
                    <h5>Loading submission...</h5>
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            )
        }
        
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
        updateSubmission: (calendarModule, id) => dispatch(updateSubmission(calendarModule, id)),
        deleteSubmission: (id) => dispatch(deleteSubmission(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSubmission)
