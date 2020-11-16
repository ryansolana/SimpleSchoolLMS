import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import M from  'materialize-css/dist/js/materialize.min.js';

import Navbar from './components/layout/Navbar'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Landing from './components/dashboard/Landing'
import VerifyEmail from './components/auth/VerifyEmail'

import AnnounceDashboard from './components/dashboard/AnnounceDashboard'
import CreateAnnounce from './components/announcements/CreateAnnounce'
import AnnounceDetails from './components/announcements/AnnounceDetails'
import UpdateAnnounce from './components/announcements/UpdateAnnounce'

import CourseMatDashboard from './components/dashboard/CourseMatDashboard'
import CreateCourseMat from './components/course-material/CreateCourseMat'
import CourseMatDetails from './components/course-material/CourseMatDetails'
import UpdateCourseMat from './components/course-material/UpdateCourseMat'

import SubmissionDashboard from './components/dashboard/SubmissionDashboard'
import CreateSubmission from './components/submissions/CreateSubmission'
import SubmissionDetails from './components/submissions/SubmissionDetails'
import UpdateSubmission from './components/submissions/UpdateSubmission'

import CalendarDashboard from './components/dashboard/CalendarDashboard'
import CreateCalendarModule from './components/calendar/CreateCalendarModule'
import UpdateCalendarModule from './components/calendar/UpdateCalendarModule'

import StudentManagement from './components/student/StudentManagement'
import StudentDetails from './components/student/StudentDetails'

import NotFound from './components/dashboard/NotFound'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminRoute from './components/auth/AdminRoute'
import Unauthorized from './components/dashboard/Unauthorized'
import UnactivatedStudent from './components/auth/UnactivatedStudent'


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
            <AdminRoute path='/announce/:id' component={ AnnounceDetails } />
            {/*<Route path='/announcements' component={ AnnounceDashboard }/>*/}
            <ProtectedRoute path='/announcements' component={AnnounceDashboard} />
            <AdminRoute path='/createAnnounce' component={ CreateAnnounce }/>
            <AdminRoute path='/editAnnounce/:id' component={ UpdateAnnounce }/>

            <ProtectedRoute path='/course-materials' component={ CourseMatDashboard }/>
            <ProtectedRoute path='/course-material/:id' component={ CourseMatDetails } />
            <AdminRoute path='/createCourseMat' component={ CreateCourseMat }/>
            <AdminRoute path='/editCourseMat/:id' component={ UpdateCourseMat } />

            <ProtectedRoute path='/submissions' component={ SubmissionDashboard }/>
            <ProtectedRoute path='/submission/:id' component={ SubmissionDetails } />
            <AdminRoute path='/createSubmission' component={ CreateSubmission }/>
            <AdminRoute path='/editSubmission/:id' component={ UpdateSubmission } />

            <ProtectedRoute path='/calendar' component={ CalendarDashboard }/>
            <AdminRoute path='/createCalendarModule' component={ CreateCalendarModule }/>
            <AdminRoute path='/editCalendarModule/:id' component={ UpdateCalendarModule }/>

            <AdminRoute path='/studentManagement' component={ StudentManagement }/>
            <AdminRoute path='/manage/student/:id' component={ StudentDetails }/>

            <Route path='/signin' component={ SignIn }/>
            <Route path='/signup' component={ SignUp }/>
            <Route path='/verify' component={ VerifyEmail }/>
            <Route path='/401' component={ Unauthorized }/>
            <Route path='/activate' component={ UnactivatedStudent }/>
            <Route component = {NotFound} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
