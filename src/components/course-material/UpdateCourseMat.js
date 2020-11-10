import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteCourseMat, updateCourseMat } from '../../store/actions/coursematActions'
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase'

class UpdateCourseMat extends Component {

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

    componentDidMount(){
        var db = firebase.firestore()

        // get data first
        var docRef = db.collection("coursemats").doc(this.props.match.params.id);
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
                textlink: data.textlink
            })
        }) 
    }

    deleteHandler = (id) =>{
        const { deleteCourseMat } = this.props;
        deleteCourseMat(id); 
        this.props.history.push('/course-materials');
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state)
        this.props.updateCourseMat(this.state, this.props.match.params.id)
        this.props.history.push('/course-materials')
    }

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in
        return (
            <div className="container z-depth-1">
                
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Edit Course Material</h5>
                    <div className="input-field">
                        <label className="active" htmlFor="email">Course Material Title</label>
                        <input type="text" id="title" onChange={this.handleChange} maxLength="100" defaultValue={this.state.title} required/>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="email">Course Material Subtitle</label>
                        <input type="text" id="subtitle" onChange={this.handleChange} maxLength="100" defaultValue={this.state.subtitle}required/>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="content">Course Material Description (2400 char max)</label>
                        <textarea id="content" className="materialize-textarea" maxLength="2400" onChange={this.handleChange} defaultValue={this.state.content} required></textarea>
                    </div>
                    <div className="input-field">
                        <label className="active" className="active" htmlFor="email">Course Material Link (with https://)</label>
                        <input type="text" id="textlink" onChange={this.handleChange} defaultValue={this.state.textlink} required/>
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
    } 
}
//  auth is now in state
const mapStateToProps = (state) =>{
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateCourseMat: (coursemat, id) => dispatch(updateCourseMat(coursemat, id)),
        deleteCourseMat: (id) => dispatch(deleteCourseMat(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCourseMat)




