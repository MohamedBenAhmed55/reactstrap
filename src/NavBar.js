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
import logo from './images/LogoCosap.png';
import Company from './Tables/company';
import FormAjoutCompany from './Forms/FormAjoutCompany';
import GlobalCalendar from './Calendar/GlobalCalendar';
import HeuresTravail from './Tables/HeuresTravail';
import Profile from './UserProfile';
import Salles from './Tables/Salles';
import Postes from './Tables/Postes';
import Groupes from './Tables/Groupes';
import ChefGroupe from './Tables/ChefGroupe';
import FormAjoutPoste from './Forms/FormAjoutPoste';
import Test from './ModalEntity';



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
                               <Link className={"nav-link"} to={"/Profile"}> Profile </Link>
                           </li>

                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/forms"}> Forms </Link>
                           </li>

                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/globalCalendar"}> Calendrier Global </Link>
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

                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/Ajout_poste"}> Ajout Poste </Link>
                           </li>
                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/form"}> Form </Link>
                           </li>

                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/modal"}> Modal </Link>
                           </li>


                       </ul>
            <li class="nav-item dropdown">
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                 Configuration du companie
                </Dropdown.Toggle>

              <Dropdown.Menu>
              <Dropdown.Item> <Link className={"nav-link"} to={"/Jours-Feries"}> JoursF </Link></Dropdown.Item>
              <Dropdown.Item> <Link className={"nav-link"} to={"/addCompany"}> AjoutCompany </Link></Dropdown.Item>
              <Dropdown.Item> <Link className={"nav-link"} to={"/heures-travail"}> Heures Travail </Link></Dropdown.Item>
              <Dropdown.Item> <Link className={"nav-link"} to={"/Salles"}> Salles </Link></Dropdown.Item>
              <Dropdown.Item> <Link className={"nav-link"} to={"/Postes"}> Postes </Link></Dropdown.Item>
              <Dropdown.Item> <Link className={"nav-link"} to={"/Groupes"}> Groupes </Link></Dropdown.Item>
              <Dropdown.Item> <Link className={"nav-link"} to={"/ChefGroup"}> Chefs Group </Link></Dropdown.Item>
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
                   <Route path="/addCompany" component={FormAjoutCompany} />
                   <Route path="/globalCalendar" component={GlobalCalendar} />
                   <Route path="/heures-travail" component={HeuresTravail} />
                   <Route path="/Profile" component={Profile} />
                   <Route path="/Salles" component={Salles} />
                   <Route path="/Postes" component={Postes} />
                   <Route path="/Groupes" component={Groupes} />
                   <Route path="/ChefGroup" component={ChefGroupe} />
                   <Route path="/Ajout_poste" component={FormAjoutPoste} />
                   <Route path="/modal" component={Test} />
                  </Switch>
               </div>)
    }
}


export default Navbar;