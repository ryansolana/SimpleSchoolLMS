import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateGrade, deleteGrade } from '../../../store/actions/gradeActions'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase'

class UpdateGrade extends Component {

    constructor(props){
        super(props);

        this.state = { 
            // firebase auth included as per mapStateToProps
            title: '',
            content: '',
            contentLink: ''
        }
    }

    componentDidMount(){
        var db = firebase.firestore()

        // get data first
        var docRef = db.collection("announces").doc(this.props.match.params.id);
        var data;

        docRef.get().then(function(doc) {
            if (doc.exists) {
                data = doc.data();
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        }).then(() =>{
            this.setState({title: data.title, content: data.content, contentLink: data.contentLink})
        })
        
    }

    deleteHandler = (id) =>{
        const { deleteGrade } = this.props;
        deleteGrade(id); 
        this.props.history.push('/studentManagement');
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

        if (e.target.value === ""){
            this.setState({
                [e.target.id]: null
            })
        }
        console.log(e.target.id + " is now " + e.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault();

        //console.log(this.state)
        this.props.updateGrade(this.state, this.props.match.params.id)
        this.props.history.push('/announcements');
    }

    render(){
        const { auth } = this.props;

        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        if (this.state === null){
            return (<div class="progress">
            <div class="indeterminate"></div>
        </div>)
        } else {
            return(<div className="container z-depth-1"> 
            <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Edit Gradement</h5>
            <br></br>
                <div className="input-field">
                    <label className="active" htmlFor="email">Gradement Title</label>
                    <input type="text" id="title" onChange={this.handleChange} defaultValue={this.state.title} required/>
                </div>

                <div className="input-field">
                    <label className="active" htmlFor="content">Gradement Content (2400 characters max)</label>
                    <textarea id="content" className="materialize-textarea" onChange={this.handleChange} maxLength="2400" rows="2" cols="200" defaultValue={this.state.content} required></textarea>
                </div>

                <div className="input-field">
                    <label className="active" htmlFor="email">Optional Link Address (include 'https://')</label>
                    <input type="text" id="contentLink" onChange={this.handleChange} defaultValue={this.state.contentLink}/>
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
        }
    } 
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateGrade: (announce, id) => dispatch(updateGrade(announce, id)),
        deleteGrade: (id) => dispatch(deleteGrade(id))
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGrade)