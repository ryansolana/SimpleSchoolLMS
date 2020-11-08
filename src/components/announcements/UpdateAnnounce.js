import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { updateAnnounce } from '../../store/actions/announceActions'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase'

class UpdateAnnounce extends Component {

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

        console.log("id: " + this.props.match.params.id)
        console.log("cdm")

        // get data first
        var docRef = db.collection("announces").doc(this.props.match.params.id);
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
            this.setState({title: data.title, content: data.content, contentLink: data.contentLink})
        })

        

        console.log("state is now: ")
        console.log(this.state)
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(e.target.id)
    }

    handleSubmit = (e) => {
        e.preventDefault();
      
        this.setState({
            title: e.target.value
        }) 

        //console.log(this.state)
        this.props.updateAnnounce(this.state, this.props.id)
        this.props.history.push('/announcements');
    }

    render(){
        const { auth } = this.props;

        console.log("component rendered")

        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        if (this.state === null){
            return (<div class="progress">
            <div class="indeterminate"></div>
        </div>)
        } else {
            return(<div className="container z-depth-1"> 
            <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Update Announcement</h5>
                <div className="input-field">
                    <label className="active" htmlFor="email">Announcement Title</label>
                    <input type="text" id="title" onChange={this.handleChange} defaultValue={this.state.title} required/>
                </div>

                <div className="input-field">
                <label htmlFor="content">Announcement Content (400 words max)</label>
                <textarea id="content" className="materialize-textarea" onChange={this.handleChange} max="400" rows="2" cols="200" defaultValue={this.state.content} required></textarea>
                </div>

                <div className="input-field">
                    <label className="active" htmlFor="email">Link URL Address (optional)</label>
                    <input type="text" id="contentLink" onChange={this.handleChange} defaultValue={this.state.contentLink}/>
                </div>

                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0 hoverable">Update Announcement</button>
                </div>
            </form>
        </div>)
        }
    } 
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateAnnounce: (announce, id) => dispatch(updateAnnounce(announce, id))
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    const id = ownProps.match.params.id;
    const announces = state.firestore.data.announces
    const announce = announces ? announces[id] : null
    return {
        announce: announce,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        id: ownProps.match.params.id
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'announces'}
    ])
)(UpdateAnnounce)