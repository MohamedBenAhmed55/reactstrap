import axios from 'axios';
import React, { Component } from 'react';
import ModalEntity from './ModalEntity';
import Forms from './Forms/ChangePassword';
class UserProfile extends Component {

    constructor() {
        super();
        this.state = {
            user: [],
            'datenais': "",
            'dateemb': ""
        };
    }

    componentDidMount() {
        this.getUser(13);
    }

    getUser(id) {
        axios.get(`http://localhost:8000/api/getsingleuser/${id}`).then(response => {
            console.log(response);
            this.setState({ user: response.data });
            console.log(this.state.user);
            this.setState({datenais: this.state.user.datenais.date});
            this.setState({dateemb: this.state.user.dateemb.date});

        })
    }

    
    // getUser(id) {
    //     axios.get(`http://localhost:8000/api/users/${id}`).then(response => {
    //         this.setState({ users: response.data })
    //         console.log(response.data);
    //     })
    // }

    render() {
        return (
            <div class="container">
                <div class="main-body">
                    <div class="row gutters-sm">
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                                        <div class="mt-3">
                                            <h4>{this.state.user.name} {this.state.user.lastname}</h4>
                                            <p class="text-secondary mb-1">Full Stack Developer</p>
                                            <p class="text-muted font-size-sm">{this.state.user.adresse}</p>    
                                            <ModalEntity Buttontitle="Modifier mdp" title="Modifier mot de passe" body={<Forms />} />
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
                                            {this.state.datenais.substr(0,10)}
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h6 class="mb-0">date d'embauche</h6>
                                        </div>
                                        <div class="col-sm-9 text-secondary">
                                            {this.state.dateemb.substr(0,10)}
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