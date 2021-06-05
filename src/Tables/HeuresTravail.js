import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import Forms from '../Forms/FormAjoutHrTravail'
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import ModalEntity from '../ModalEntity';
import ReactPaginate from 'react-paginate';
import { Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

class HeuresTravail extends Component {

    constructor() {
        super();
        this.state = {
            Heures: [],
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
            redirect: false,
            company: "/api/companies/" + jwtDecode(localStorage.getItem('token')).company,
        };
        this.handlePageClick = this.handlePageClick.bind(this);

    }

    componentDidMount() {
        this.getHeures();
        if (this.state.role != "ROLE_ADMIN" ^ this.state.role != "ROLE_CLIENT") {
            this.setState({ redirect: true })
        }

    }

    getHeures() {
        axios.get(`http://localhost:8000/api/heures_travails/`).then(response => {
            // this.setState({ Heures: response.data['hydra:member'] })
            var tdata = response.data['hydra:member'];
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                tableData: slice
            })

            console.log(response.data['hydra:member'])
        })
    }

    deleteHeure(id) {
        let confirm = window.confirm("êtes-vous sûr ?")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/heures_travails/${id}`).then(res => { alert("élément supprimé!"); this.getHeures() });
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
                    <h1 className="display-3">Liste des heures du travail</h1>
                </Jumbotron>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>

                                <div className="col-md-10 offset-md-1 row-block" >
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Heure_deb</th>
                                                <th scope="col">Heure_fin</th>
                                                <th scope="col">Heure_deb_pause</th>
                                                <th scope="col">Heure_fin_pause</th>
                                                <th scope="col">Seance Unique</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.tableData.map((heure, i) =>
                                                (this.state.company == heure.company ?
                                                <tr class="table-light" key={heure.id}>
                                                


                                                    <td>{heure.heureDeb.substr(11, 8)}</td>
                                                    <td>{heure.heureFin.substr(11, 8)}</td>
                                                    <td>{heure.heureDebPause.substr(11, 8)}</td>
                                                    <td>{heure.heureFinPause.substr(11, 8)}</td>
                                                    <td>{heure.isSeanceUnique ? "Oui" : "Non"}</td>
                                                    <td><ModalEntity Buttontitle="Modifier" title="Modifier heures du travail" body={<Forms modify={heure.id} data={heure} />} /></td>
                                                    <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deleteHeure(heure.id)} >Remove</button></td>
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
                            <ModalEntity Buttontitle="Ajouter heures du travail" title="Ajouter utilisateur" body={<Forms />} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeuresTravail;