import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import * as firebase from 'firebase'

class CalendarModuleDetails extends Component{

    // we need the user id and the calendarModule id at the same time
    constructor(props){
        super(props);

        this.state = { 
            // firebase auth included as per mapStateToProps
            title: null,
            calendarModule: null,
            content: null,
            loading: true
        }
    }

    componentDidMount(){
        var db = firebase.firestore()
        const id = this.props.match.params.id

        var docRef = db.collection("calendarModules").doc(id);
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
            this.setState({title: data.title, content: data.content, weekNum: data.weekNum, date: data.date, 
                status: data.status, authorFirstName: data.authorFirstName, authorLastName: data.authorLastName,
            createdAt: data.createdAt, loading: false})
        
        })
    }

    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> // redirect to signin if user is not logged in

        const m = moment(this.state.date, 'YYYY-MM-DD');
        const date = m.format('LL');
        var status = this.state.status === "Released" ? "Released" : "Due";

        if (!this.state.loading){
            return (
            <div>
                <div className="container section calendarModule-details">

                <h3 className="page-title padding">School of Logistics - {date} Calendar </h3>
                    <div className="card z-depth-2">

                        <div className="card-content" style={{paddingBottom: 0}}>
                            <div className="row">
                                <span className="card-title">Date Details</span>
                                <p><bold>Week:</bold> {this.state.weekNum}</p>
                                <p><bold>Title:</bold> {this.state.title}</p>
                                <p><bold>Open / Due Date:</bold> {date}</p>
                                <p><bold>Status:</bold> {status}</p>
                            </div>
                        </div>

                        <div className="card-action"> 
                            <p><bold>Description:</bold> {this.state.content}</p>
                        </div>
                    </div>
                    <Link to='/calendar' className="btn waves-light white-text">Return to Calendar</Link>
                </div>


            </div>
            )
        } else {
            return (
                <div className="container center">
                    <h5>Loading date details...</h5>
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
        calendarModules: state.firestore.ordered.calendarModules,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect([
        { collection: 'calendarModules', orderBy: ['weekNum', 'asc' ]},
    ])
)(CalendarModuleDetails)