import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import Forms from '../Forms/FormAjoutSalle'
import ModalEntity from '../ModalEntity'
import ReactPaginate from 'react-paginate';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import jwtDecode from 'jwt-decode';

class Salles extends Component {

    constructor() {
        super();
        this.state = {
            Salles: [],
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
            redirect: false,
            company: "",
        };
        this.handlePageClick = this.handlePageClick.bind(this);

    }

    componentDidMount() {
        this.getSalles();
        this.setState({ company: "/api/companies/" + jwtDecode(localStorage.getItem('token')).company });
        if (this.state.role != "ROLE_ADMIN" ^ this.state.role != "ROLE_CLIENT") {
            this.setState({ redirect: true })
        }
        console.log("/api/companies/" + jwtDecode(localStorage.getItem('token')).company)
    }


    getSalles() {
        axios.get(`http://localhost:8000/api/salles`).then(response => {
            // this.setState({ Salles: response.data['hydra:member'] })
            var tdata = response.data['hydra:member'];
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                tableData: slice
            })
        })
    }

    deleteSalle(id) {
        let confirm = window.confirm("veuillez confirmer")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/salles/${id}`).then(res => {
                alert("élément supprimé!");
                this.getSalles()
            }).catch(err => {
                alert("échec de l'opération")
            });
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
            tableData: slice
        })

    }



    render() {

        if (this.state.redirect) {
            return (<Redirect to={'/dashboard'} />)
        }


        return (
            <div style={{ marginTop: 70 }}>
                <Jumbotron style={{ "text-align": "center", "margin-top": "10px", "fontWeight": "bold" }}>
                    <h1 className="display-3">Liste Des Salles</h1>
                </Jumbotron>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>

                                <div className="col-md-10 offset-md-1 row-block" >
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nom</th>
                                                <th scope="col">Etage</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.tableData.map((Salle, i) =>
                                                (this.state.company == Salle.company ?
                                                <tr class="table-light" key={Salle.id}>
                                                    <td>{Salle.nom}</td>
                                                    <td>{Salle.Etage}</td>
                                                    <td><ModalEntity Buttontitle="Modifier" title="Modifier salle" body={<Forms body={Salle} modify={Salle.id} />} /></td>
                                                    <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deleteSalle(Salle.id)} >Remove</button></td>
                                                </tr>: null))}

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
                                    <ModalEntity Buttontitle="Ajouter Salle" title="Ajouter Salle" body={<Forms />} />
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </div>
        )
    }
}

export default Salles;