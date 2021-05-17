import React, { Component } from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import FormAjoutCompany from '../Forms/FormAjoutCompany'
import { Button, Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import ModalEntity from '../ModalEntity';
import jwtdecode from 'jwt-decode';
import ReactPaginate from 'react-paginate';

class Company extends Component {

    constructor() {
        super();
        this.state = {
            companies: [],
            show: false,
            setShow: false,
            redirect: false,
            role:jwtdecode(localStorage.getItem('token')).roles[0],
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
        };
        this.refreshPage = this.refreshPage.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);

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
            // this.setState({ companies: response.data['hydra:member'] })
            var tdata=response.data['hydra:member'];
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                tableData: slice
        })
        })
    }

    deleteCompany(id) {
        let confirm = window.confirm("êtes-vous sûr ?")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/companies/${id}`).then(res => { this.getCompanies() });
        }

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    }


    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/dashboard'}/>)
          }


        return (
            <div style={{marginTop:70}}>
            <Jumbotron style={{"text-align":"center", "margin-top":"10px", "fontWeight":"bold"}}>
                    <h1 className="display-3">La Liste Des compagnies clientes</h1>                    
                </Jumbotron>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>
                            
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Code postak</th>
                                            <th scope="col">email</th>
                                            <th scope="col">Matricule Fiscale</th>
                                            <th scope="col">Secteur d'activité</th>
                                            <th scope="col">N°tel</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.tableData.map((company,i) =>
                                            <tr class="table-light" key={company.id} >
                                                <td>{company.name}</td>
                                                <td>{company.city}</td>
                                                <td>{company.postalcode}</td>
                                                <td>{company.email}</td>
                                                <td>{company.matriculeFiscale}</td>
                                                <td>{company.secteurActivite}</td>
                                                <td>{company.phone}</td>
                                                <td> <ModalEntity Buttontitle="Modifier" title="Modifier société" body={<FormAjoutCompany data={company} modify={company.id} />} /></td>
                                                <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deleteCompany(company.id)} >Supprimer</button></td>
                                            </tr>)}

                                    </tbody>
                                </table>
                                
                                <ReactPaginate
                                    previousLabel={"🠔"}
                                    nextLabel={"🠖"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                            </div>
                            
                            
                        }

                    </div>
                </section>
                <div className="container">
                    <ModalEntity Buttontitle="Ajouter compagnie" title="Ajouter une compagnie" body={<FormAjoutCompany />} />

                </div>
            </div>
        )
    }
}

export default Company;