import React, { Component } from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import EventCalendar from './Calendar/EventCalendar';
import Users from './Tables/Users';
import JourFerie from './Tables/JoursFerie';
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
import HomePage from './HomePage/HomePage';
import Taches from './Tables/Taches'


class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {redirect:false};
        this.Logout = this.Logout.bind(this);
    }
    
    Logout() {
        localStorage.removeItem('token');
        this.setState({redirect: true});
        localStorage.setItem("isLoggedout", true);
        
    }


    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className={"navbar-brand"} to={"/dashboard/home"}> <img src={logo} alt="logo" style={{ width: "40px", height: "40px " }} /></Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarColor03">
                        <ul class="navbar-nav mr-auto">
                            <ul className="navbar-nav mr-auto">

                                <li className="nav-item">
                                    <Link className={"nav-link"} to={"/dashboard/Profile"}> Profile </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={"nav-link"} to={"/dashboard/globalCalendar"}> Calendrier Global </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={"nav-link"} to={"/dashboard/eventcalendar"}> My Calendar </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={"nav-link"} to={"/dashboard/users"}> Users </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={"nav-link"} to={"/dashboard/Jours-Feries"}> JoursF </Link>
                                </li>

                              

                                <li className="nav-item">
                                    <Link className={"nav-link"} to={"/dashboard/company"}> Company </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={"nav-link"} to={"/dashboard/Taches"}> Taches </Link>
                                </li>


                            </ul>
                            <li class="nav-item dropdown">
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Configuration du companie
                </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item> <Link className={"nav-link"} to={"/dashboard/Jours-Feries"}> JoursF </Link></Dropdown.Item>
                                        <Dropdown.Item> <Link className={"nav-link"} to={"/dashboard/addCompany"}> AjoutCompany </Link></Dropdown.Item>
                                        <Dropdown.Item> <Link className={"nav-link"} to={"/dashboard/heures-travail"}> Heures Travail </Link></Dropdown.Item>
                                        <Dropdown.Item> <Link className={"nav-link"} to={"/dashboard/Salles"}> Salles </Link></Dropdown.Item>
                                        <Dropdown.Item> <Link className={"nav-link"} to={"/dashboard/Postes"}> Postes </Link></Dropdown.Item>
                                        <Dropdown.Item> <Link className={"nav-link"} to={"/dashboard/Groupes"}> Groupes </Link></Dropdown.Item>
                                        <Dropdown.Item> <Link className={"nav-link"} to={"/dashboard/ChefGroup"}> Chefs Group </Link></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </li>
                        </ul>


                        <button class="btn btn-secondary my-2 my-sm-0" onClick={this.Logout}>Logout</button>


                    </div>

                </nav>
                <Switch>
                    <Redirect exact from="/dashboard" to="/dashboard/home" />
                    <Route path="/dashboard/eventcalendar" component={EventCalendar} />
                    <Route path="/dashboard/users" component={Users} />
                    <Route path="/dashboard/Jours-Feries" component={JourFerie} />
                    <Route path="/dashboard/company" component={Company} />
                    <Route path="/dashboard/addCompany" component={FormAjoutCompany} />
                    <Route path="/dashboard/globalCalendar" component={GlobalCalendar} />
                    <Route path="/dashboard/heures-travail" component={HeuresTravail} />
                    <Route path="/dashboard/Profile" component={Profile} />
                    <Route path="/dashboard/Salles" component={Salles} />
                    <Route path="/dashboard/Postes" component={Postes} />
                    <Route path="/dashboard/Groupes" component={Groupes} />
                    <Route path="/dashboard/ChefGroup" component={ChefGroupe} />
                    <Route path="/dashboard/home" component={HomePage} />                   
                    <Route path="/dashboard/Taches" component={Taches} />
                    
                </Switch>
                {this.state.redirect ? <Redirect  to="/login" /> : null}
            </div>)
    }
}


export default Navbar;