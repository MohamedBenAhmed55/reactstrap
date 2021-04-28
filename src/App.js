import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Forms from './Forms';
import UserProfile from './UserProfile'
import Login from './Login';
import NavBar from './NavBar'
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import FinalPage from './Finalpage';
import EventCalendar from './Calendar/EventCalendar';
import Users from './Tables/Users';
import JourFerie from './Tables/JoursFerie';
import Company from './Tables/company';
import GlobalCalendar from './Calendar/GlobalCalendar';
import HeuresTravail from './Tables/HeuresTravail';
import Profile from './UserProfile';
import Salles from './Tables/Salles';
import Postes from './Tables/Postes';
import Groupes from './Tables/Groupes';
import ChefGroupe from './Tables/ChefGroupe';
import HomePage from './HomePage/HomePage';

function App(){
   
  return(
    <Router>
         <Switch>
                    <Redirect exact from="/" to="/login" />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={NavBar} />
                    <Route path="/dashboard/eventcalendar" component={EventCalendar} />
                    <Route path="/dashboard/users" component={Users} />
                    <Route path="/dashboard/Jours-Feries" component={JourFerie} />
                    <Route path="/dashboard/company" component={Company} />
                    <Route path="/dashboard/globalCalendar" component={GlobalCalendar} />
                    <Route path="/dashboard/heures-travail" component={HeuresTravail} />
                    <Route path="/dashboard/Profile" component={Profile} />
                    <Route path="/dashboard/Salles" component={Salles} />
                    <Route path="/dashboard/Postes" component={Postes} />
                    <Route path="/dashboard/Groupes" component={Groupes} />
                    <Route path="/dashboard/ChefGroup" component={ChefGroupe} />
                    <Route path="/dashboard/home" component={HomePage} />
                </Switch>
      </Router>

  )
}

export default App;

