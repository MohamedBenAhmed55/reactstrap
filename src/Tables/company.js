import React, { Component } from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import FormAjoutCompany from '../Forms/FormAjoutCompany'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import ModalEntity from '../ModalEntity';
import jwtdecode from 'jwt-decode';

class Company extends Component {

    constructor() {
        super();
        this.state = {
            companies: [],
            show: false,
            setShow: false,
            redirect: false,
            role:jwtdecode(localStorage.getItem('token')).roles[0],
        };
        this.refreshPage = this.refreshPage.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);

    }

    componentDidMount() {
        this.getCompanies();
        if(this.state.role !="ROLE_ADMIN"){
            this.setState({redirect:true})
        }

    }

    refreshPage = () => {
        window.location.reload();
        

    }

    getCompanies() {
        axios.get(`http://localhost:8000/api/companies`).then(response => {
            this.setState({ companies: response.data['hydra:member'] })
        })
    }

    deleteCompany(id) {
        let confirm = window.confirm("êtes-vous sûr ?")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/companies/${id}`).then(res => { this.getCompanies() });
        }

    }


    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/dashboard'}/>)
          }


        return (
            <div>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">City</th>
                                            <th scope="col">postalCode</th>
                                            <th scope="col">email</th>
                                            <th scope="col">logo</th>
                                            <th scope="col">matriculeFiscale</th>
                                            <th scope="col">secteurActivite</th>
                                            <th scope="col">phone</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.companies.map(company =>
                                            <tr class="table-light" key={company.id} >
                                                <td>{company.name}</td>
                                                <td>{company.city}</td>
                                                <td>{company.postalcode}</td>
                                                <td>{company.email}</td>
                                                <td>{company.logo}</td>
                                                <td>{company.matriculeFiscale}</td>
                                                <td>{company.secteurActivite}</td>
                                                <td>{company.phone}</td>
                                                <td> <ModalEntity Buttontitle="Modifier" title="Modifier société" body={<FormAjoutCompany data={company} modify={company.id} />} /></td>
                                                <td><Button onClick={() => this.deleteCompany(company.id)} >Supprimer</Button></td>
                                            </tr>)}

                                    </tbody>
                                </table>
                            </div>
                        }

                    </div>
                </section>
                <div className="container">
                    <ModalEntity Buttontitle="Add Company" title="Ajouter Comapany" body={<FormAjoutCompany />} />

                </div>
            </div>
        )
    }
}

export default Company;