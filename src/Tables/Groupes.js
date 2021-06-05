import React, { Component } from 'react';
import axios from 'axios';
import { Button, Jumbotron } from 'react-bootstrap';
import Forms from '../Forms/FomAjoutGroupe'
import ModalEntity from '../ModalEntity';
import ReactPaginate from 'react-paginate';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';

class Groupes extends Component {

    constructor() {
        super();
        this.state = {
            Groupes: [],
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
            company: "",
            redirect: false,
            company: "/api/companies/" + jwtDecode(localStorage.getItem('token')).company,
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.getGroupes();
        this.setState({ company: "/api/companies/" + jwtDecode(localStorage.getItem('token')).company });
        if (this.state.role != "ROLE_ADMIN" ^ this.state.role != "ROLE_CLIENT") {
            this.setState({ redirect: true })
        }

    }

    getGroupes() {
        axios.get(`http://localhost:8000/api/groupes`).then(response => {
            // this.setState({ Groupes: response.data['hydra:member'] })
            var tdata = response.data['hydra:member'];
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                tableData: slice
            })
        })
    }

    deleteGroup(id) {
        let confirm = window.confirm("êtes-vous sûr ?")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/groupes/${id}`).then(res => { alert("group supprimé!"); this.getGroupes() });
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
                    <h1 className="display-3">Liste des Groupes</h1>
                </Jumbotron>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>

                                <div className="col-md-10 offset-md-1 row-block" >
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nom du groupe</th>
                                                {/* <th scope="col">chef</th> */}
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.tableData.map((groupe, i) =>
                                            (groupe.company == this.state.company ? <tr class="table-light" >
                                                <td>{groupe.name}</td>
                                                {/* <td>{groupe.chef}</td> */}
                                                <td>  <ModalEntity Buttontitle="Modifier" title="Modifer un groupe" body={<Forms modify={groupe.id} data={groupe} />} /></td>
                                                <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deleteGroup(groupe.id)} >supprimer</button></td>

                                            </tr> : null))}

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
                            <ModalEntity Buttontitle="Ajouter" title="Ajouter un groupe" body={<Forms />} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Groupes;