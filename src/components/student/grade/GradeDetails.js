import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'

class GradeDetails extends Component{

    // we need the user id and the grade id at the same time
    constructor(props){
        super(props);

        this.state = { 
            // firebase auth included as per mapStateToProps
            title: null,
            grade: null,
            content: null,
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
    

    render(){
        const { auth, profile} = this.props;
        const id = this.props.match.params.id
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        // cannot see other peoples grades unless admin
        if (auth && profile && id && (auth.uid !== id) && (!profile.isAdmin)) 
            return <Redirect to='/401' />

        if (!this.state.loading && this.state.title){
            return (
            <div>
                <div className="container section grade-details">
                    <div className="card z-depth-2">
                        <div className="card-content">
                            <div className="row">
                                <span className="card-title">{this.state.title} Grading</span>
                                <div>Grading by {this.state.authorFirstName} {this.state.authorLastName}, {moment(this.state.createdAt.toDate()).calendar()}</div>
                            </div>
                        </div>

                        <div className="card-action"> 
                            <p><bold>Mark:</bold> {this.state.grade}</p>
                            <p><bold>Feedback:</bold> {this.state.content}</p>
                        </div>
                    </div>

                    {
                        profile.isAdmin && 
                        <div>
                            <Link to={'/editGrade/' + this.props.match.params.id +'/' + this.props.match.params.gid}><button className="btn orange white-text">Edit Grade</button></Link>
                        </div>     
                    } 
                    
                </div>
            </div>
            )
        } else {
            return (
                <div className="container center">
                    <h5>Loading grade...</h5>
                    <div class="progress">
                        <div class="indeterminate"></div>
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

export default connect(mapStateToProps, null)(GradeDetails)
