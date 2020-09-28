import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import M from  'materialize-css/dist/js/materialize.min.js';

import PostDashboard from './components/dashboard/PostDashboard'
import Landing from './components/dashboard/Landing'

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
            <Route path='/signin' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/create' component={CreateProject}/>
            <Route path='/announcements' component={PostDashboard}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
