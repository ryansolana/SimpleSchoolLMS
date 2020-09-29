import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import M from  'materialize-css/dist/js/materialize.min.js';

import AnnounceDashboard from './components/dashboard/AnnounceDashboard'
import Landing from './components/dashboard/Landing'
import CreateAnnounce from './components/announcements/CreateAnnounce'
import AnnounceDetails from './components/announcements/AnnounceDetails'

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
            <Route path='/project/:id' component={ ProjectDetails } />
            <Route path='/announce/:id' component={ AnnounceDetails } />
            <Route path='/signin' component={ SignIn }/>
            <Route path='/signup' component={ SignUp }/>
            <Route path='/createProject' component={ CreateProject }/>
            <Route path='/createAnnounce' component={ CreateAnnounce }/>
            <Route path='/announcements' component={ AnnounceDashboard }/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
