import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Forms from '../Forms/FormAjoutUtilisateur'
import axios from 'axios';
import ModalEntity from '../ModalEntity';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';

class Users extends Component {

    constructor() {
        super();
        this.state = { users: [], company:"" };
    }

    componentDidMount() {
        this.getUsers();
        this.setState({company: "/api/companies/" + jwtDecode(localStorage.getItem('token')).company});
        console.log("/api/companies/" + jwtDecode(localStorage.getItem('token')).company)

    }

    getUsers() {
        axios.get(`http://localhost:8000/api/users`).then(response => {
            this.setState({ users: response.data['hydra:member'] })
            // console.log(response.data['hydra:member']);
        })
    }

    deleteUser(id) {
        let confirm = window.confirm("voulez vous vraiment supprimer cet utilisateur ?")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/users/${id}`).then(res => {
                alert("Utilisateur supprimé!");
                this.getUsers();
            }
            )
        }

    }


    render() {

        // if(!localStorage.getItem('token')){
        //     return (<Redirect to={'/login'}/>)
        //   }

        return (
            <div>
                <section className="row-section">

                    {
                        <div className={'row'}>

                            <div className="col-md-10 offset-md-1 row-block" >
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Prenom</th>
                                            <th scope="col">Matricule</th>
                                            <th scope="col">Cin</th>
                                            <th scope="col">Date Embauche</th>
                                            <th scope="col">Présence</th>
                                            <th scope="col">Salaire</th>
                                            <th scope="col">numéro</th>
                                            <th scope="col">Pays</th>
                                            <th scope="col">Email</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.users.map(user =>
                                        ( this.state.company == user.company ?
                                            <tr class="table-light" >
                                                <td>{user.nom}</td>
                                                <td>{user.prenom}</td>
                                                <td>{user.matricule}</td>
                                                <td>{user.cin}</td>
                                                <td>{user.dateEmbauche.substr(0, 10)}</td>
                                                <td>{user.etatPresence}</td>
                                                <td>{user.Salaire}</td>
                                                <td>{user.Fax}</td>
                                                <td>{user.Pays}</td>
                                                <td>{user.email}</td>
                                                <td><ModalEntity Buttontitle="Modifier" title="Modifier utilisateur" body={<Forms data={user} modify={user.id} show={false} />} /></td>
                                                <td><Button onClick={() => this.deleteUser(user.id)} >Remove</Button></td>
                                            </tr> : null))}

                                    </tbody>
                                </table>
                            </div>



                        </div>
                    }


                </section>
                <div className="container">
                    <div className={'row'}>
                        <div className="col-md-10 offset-md-1 row-block" >
                            <ModalEntity Buttontitle="Add User" title="Ajouter utilisateur" body={<Forms show={true} />} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Users;