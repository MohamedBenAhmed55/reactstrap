import axios from 'axios';
import React, { Component } from 'react';
import ModalEntity from './ModalEntity';
import Forms from './Forms/ChangePassword';
import FormsUpdate from './Forms/FormProfileUserUpdate';
import jwt_decode from "jwt-decode";

class UserProfile extends Component {

    constructor() {
        super();
        this.state = {
            'user': "",
            'datenais': "",
            'dateemb': "",
            'token': "",
            'id': jwt_decode(localStorage.getItem('token')).UserId,
        };
    }

    componentDidMount() {

        // console.log(jwt_decode(localStorage.getItem('token')).UserId);
        // this.setState({token: jwt_decode(localStorage.getItem('token'))});
        // this.setState({id: this.state.token.UserId});
        // console.log(this.state.id);
        this.TokenHandle();
        this.getUser(this.state.id);

    }

    TokenHandle() {
        let token = localStorage.getItem('token');
        // console.log(jwt_decode(token).UserId);
        this.state.id = jwt_decode(token).UserId;
    }

    getUser(id) {

        axios.get(`http://localhost:8000/api/getsingleuser/${id}`).then(response => {
            console.log(response.data);
            this.setState({ user: response.data });
            console.log(this.state.user);
            this.setState({ datenais: this.state.user.datenais.date, dateemb: this.state.user.dateemb.date });
            console.log(this.state.user.id);

        })
    }




    render() {
        return (
            <div class="container" style={{marginTop:70}}>
                <div class="main-body">
                    <div class="row gutters-sm">
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                                        <div class="mt-3">
                                            <h4>{this.state.user.name} {this.state.user.lastname}</h4>
                                            {/* <p class="text-secondary mb-1">Full Stack Developer</p> */}
                                            <p class="text-muted font-size-sm">{this.state.user.adresse}</p>
                                            <ModalEntity Buttontitle="Modifier mot de passe" title="Modifier mot de passe" body={<Forms modify={this.state.id} />} />
                                            <hr />
                                            <ModalEntity Buttontitle="Modifier profile" title="Modifier Profile" body={<FormsUpdate modify={this.state.id} user={this.state.user} />} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-8">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Full Name</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {this.state.user.name} {this.state.user.lastname}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Username</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {this.state.user.username}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Email</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {this.state.user.email}

                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Phone</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {this.state.user.phone}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Fax</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {this.state.user.fax}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Address</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {this.state.user.adresse}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Matricule</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {this.state.user.matricule}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">date de naissance</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {this.state.datenais.substr(0, 10)}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">date d'embauche</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {this.state.dateemb.substr(0, 10)}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">Poste</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {this.state.user.poste}
                                        </div>
                                    </div>



                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;