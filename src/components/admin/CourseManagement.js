import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'


class CourseManagement extends Component{

    state = {
        currentWeek: 1,
        loading: true
    }

    componentDidMount = () => {
        var db = firebase.firestore()
        var data;
        // get data first
        var docRef = db.collection("schoolSettings").doc("courseSettings");
        // collect data
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
            if (data){
                this.setState({
                    currentWeek: data.currentWeek,
                    loading: false
                })
                console.log(this.state)
            }
        }) 
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(e.target.id, e.target.value)
    }

    handleSubmit = (e) => {
        var db = firebase.firestore()
        e.preventDefault();
        
        console.log(this.state.currentWeek)

        let newSetting = {currentWeek: this.state.currentWeek}

        console.log(newSetting)

        db.collection("schoolSettings").doc("courseSettings").update({
            ...newSetting
        }).then(()=>{
            console.info("Updated course settings")
            this.props.history.push('/courseManagement')
        }).catch((err)=>{
            console.info("Failed to update course settings", err)
        })   
    }

    render(){
        if (!this.state.loading){
            return(
                <div className="dashboard container">
                    <h3 className="padding page-title">Course Management</h3>

                    <form onSubmit={this.handleSubmit} className="white z-depth-1" style={{margin:0}}>
                        <h5 className="grey-text text-darken-3">Current Course Settings</h5>
                        <br></br>
                        <div className="input-field">
                            <i className="material-icons prefix">week</i>
                            <label className='active' htmlFor="email">Current Week Number (default: 1)</label>
                            <input type="number" id="currentWeek" defaultValue={this.state.currentWeek} onChange={this.handleChange} min="0" max="52" required/>
                        </div>
                        <div className="input-field">
                            <button className="btn green lighten-1 hoverable waves-effect">Confirm Changes</button>
                        </div>   
                    </form>

                </div>
            )
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

const mapStateToProps = (state) =>{
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(CourseManagement)