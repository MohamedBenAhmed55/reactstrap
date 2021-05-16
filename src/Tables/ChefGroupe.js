import React, { Component } from 'react';
import axios from 'axios';
import { Button, Jumbotron } from 'react-bootstrap';
import Forms from '../Forms/FormAjoutChefGroupe';
import ModalEntity from '../ModalEntity';
import { Redirect } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import jwtDecode from 'jwt-decode';

class ChefGroupe extends Component {

    constructor() {
        super();
        this.state = {
            Chefs: [],
            redirect: false,
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
            company: "",
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    componentDidMount() {
        // this.setState({redirect: localStorage.getItem("isLoggedout")})
        this.getChefGroupe();
        this.setState({ company: "/api/companies/" + jwtDecode(localStorage.getItem('token')).company });


    }

    getChefGroupe() {
        axios.get(`http://localhost:8000/api/chef_groupes`).then(response => {
            // this.setState({ Chefs: response.data['hydra:member'] })
            var tdata=response.data['hydra:member'];
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                tableData: slice
        })
        })
    }

    deleteChef(id) {
        let confirm = window.confirm("êtes-vous sûr ?")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/chef_groupes/${id}`).then(res => {
                alert("chef supprimé!");
                this.getChefGroupe();
            }).catch(err => {
                alert("Echec de l'opération ! ")
            })
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

        return (

            <div style={{ marginTop: 70 }}>
                <Jumbotron style={{ "text-align": "center", "margin-top": "10px", "fontWeight": "bold" }}>
                    <h1 className="display-3">La Liste Des chefs de groupe</h1>
                </Jumbotron>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>

                                <div className="col-md-10 offset-md-1 row-block" >
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nom du chef</th>
                                                <th scope="col">Date Debut</th>
                                                <th scope="col">Date Fin</th>
                                                <th scope="col">Groupe</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.tableData.map((chef,i) =>
                                            (chef.company == this.state.company ?
                                                <tr class="table-light" >
                                                    <td>{chef.name}</td>
                                                    <td>{chef.dateDeb.substr(0, 10)}</td>
                                                    <td>{chef.dateFin.substr(0, 10)}</td>
                                                    <td>{chef.groupname}</td>
                                                    <td><ModalEntity Buttontitle="Modifier" title="Modifier chef" body={<Forms id={chef.id} data={chef} />} /></td>
                                                    <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deleteChef(chef.id)} >Remove</button></td>
                                                </tr>:null))}

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

                            </div>
                        }

                    </div>
                </section>
                <div className="container">
                    <div className={'row'}>
                        <div className="col-md-10 offset-md-1 row-block" >
                            <ModalEntity Buttontitle="Ajouter un chef de groupe" title="Ajouter Chef" body={<Forms />} />
                        </div>
                    </div>
                </div>
                {this.state.redirect ? <Redirect to="/login" /> : null}
            </div>
        )
    }
}

export default ChefGroupe;