import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import M from  'materialize-css/dist/js/materialize.min.js';

import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Landing from './components/dashboard/Landing'

import AnnounceDashboard from './components/dashboard/AnnounceDashboard'
import CreateAnnounce from './components/announcements/CreateAnnounce'
import AnnounceDetails from './components/announcements/AnnounceDetails'

import CourseMatDashboard from './components/dashboard/CourseMatDashboard'
import CreateCourseMat from './components/course-material/CreateCourseMat'
import CourseMatDetails from './components/course-material/CourseMatDetails'


class App extends Component {
  componentDidMount() {
    let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {});
  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path='/' component={ Landing } />
            <Route path='/announcements' component={ AnnounceDashboard }/>
            <Route path='/announce/:id' component={ AnnounceDetails } />
            <Route path='/createAnnounce' component={ CreateAnnounce }/>

            <Route path='/course-material' component={ CourseMatDashboard }/>
            <Route path='/coursemat/:id' component={ CourseMatDetails } />
            <Route path='/createCourseMat' component={ CreateCourseMat }/>

            <Route path='/signin' component={ SignIn }/>
            <Route path='/signup' component={ SignUp }/>



          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
