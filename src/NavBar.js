import React, { Component } from 'react';
import {Route, Switch,Redirect, Link, withRouter} from 'react-router-dom';
import Forms from './Forms/FormAjoutUtilisateur';
// import Cards from './Cards'
// import Breadcrumbs from './Breadcrumbs';
import EventCalendar from './Calendar/EventCalendar';
import Users from './Tables/Users';
import Table from './Tables/Table';
// import Login from './Login'
import JourFerie from './Tables/JoursFerie';
import FormAjoutEvenement from './Forms/FormAjoutEvenement';
import Dropdown from 'react-bootstrap/Dropdown'
import logo from './images/cosap logo.png';
import Company from './Tables/company';

class Navbar extends Component{
    render(){
        return(
          <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link className={"navbar-brand"} to={"/"}> <img src={logo} alt="logo" style={{ width: "40px", height: "40px " }} /></Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> 
      
        <div class="collapse navbar-collapse" id="navbarColor03">
          <ul class="navbar-nav mr-auto">
          <ul className="navbar-nav mr-auto">
                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/forms"}> Forms </Link>
                           </li>
    
                           {/* <li className="nav-item">
                               <Link className={"nav-link"} to={"/cards"}> Cards </Link>
                           </li>

                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/breadcrumbs"}> BreadCrumbs </Link>
                           </li> */}

                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/eventcalendar"}> My Calendar </Link>
                           </li>

                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/users"}> Users </Link>
                           </li>

                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/table"}> Table </Link>
                           </li>

                           {/* <li className="nav-item">
                               <Link className={"nav-link"} to={"/login"}> Login </Link>
                           </li> */}

                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/Jours-Feries"}> JoursF </Link>
                           </li>

                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/Ajout-evt"}> Evenement </Link>
                           </li>

                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/company"}> Company </Link>
                           </li>


                       </ul>
            <li class="nav-item dropdown">
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                 Dropdown Button
                </Dropdown.Toggle>

              <Dropdown.Menu>
              <Dropdown.Item ><Link className={"nav-link"} to={"/Jours-Feries"}> JoursF </Link></Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
             </Dropdown.Menu>
            </Dropdown>
            </li>
          </ul>
          
        </div>
       
      </nav>
                  <Switch>
                   <Redirect exact from="/" to="/forms" />
                   <Route path="/forms" component={Forms} />
                   {/* <Route path="/cards" component={Cards} />
                   <Route path="/breadcrumbs" component={Breadcrumbs} /> */}
                   <Route path="/eventcalendar" component={EventCalendar} />
                   <Route path="/users" component={Users} />
                   <Route path="/Jours-Feries" component={JourFerie} />
                   <Route path="/table" component={Table} />
                   {/* <Route path="/login" component={Login} /> */}
                   <Route path="/Ajout-evt" component={FormAjoutEvenement} />
                   <Route path="/company" component={Company} />
                  </Switch>
               </div>)
    }
}


export default Navbar;