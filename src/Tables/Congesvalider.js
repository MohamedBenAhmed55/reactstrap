import React from 'react';
import { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ModalEntity from '../ModalEntity';
import Forms from '../Forms/FormTache';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import ReactPaginate from 'react-paginate';


class CongesValider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Conges: [],
            CompanyId: jwt_decode(localStorage.getItem('token')).company,
            UserId: jwt_decode(localStorage.getItem('token')).UserId,
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
            group: jwt_decode(localStorage.getItem('token')).group,
            redirect: false,
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.getConges();
        if (this.state.role != "ROLE_ADMIN" ^ this.state.role != "ROLE_LEAD") {
            this.setState({ redirect: true })
        }
    }

    getConges() {
        axios.get(`http://localhost:8000/api/conges`).then(response => {
            // this.setState({ Conges: response.data['hydra:member'] })
            var tdata = response.data['hydra:member'];
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                tableData: slice
            })
        })
    }

    Validateconge(id) {
        let del = window.confirm("êtes vous sûr ?");
        if (del) {
            axios({
                method: 'patch',
                url: `http://localhost:8000/api/conges/${id}`,
                data: {
                    "isValidated": true,
                },
                headers: {
                    "Content-Type": 'application/merge-patch+json'
                }
            }).then(res => {
                alert("Congé validé !");
                this.getConges();
            }).catch(err => {
                alert("L'opération a échoué");
            })
        }
    }

    deleteconge(id) {
        let del = window.confirm("êtes vous sûr ?");
        if (del) {
            axios.delete(`http://localhost:8000/api/conges/${id}`).then(res => {
                alert("élément supprimé!");
                this.getConges();
            }
            );
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
                    <h1 className="display-3">Liste des congés à valider</h1>
                </Jumbotron>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>
                                <div className="col-md-10 offset-md-1 row-block" >
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Date de debut</th>
                                                <th scope="col">Date de fin</th>
                                                <th scope="col">Date du reprise</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Etat</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.tableData.map((conge, i) =>
                                            (conge.groupee == this.state.group ? (conge.isValidated == false ?
                                                <tr class="table-light" key={conge.id}>
                                                    <td>{conge.dateDeb.substr(0, 10)}</td>
                                                    <td>{conge.dateFin.substr(0, 10)}</td>
                                                    <td>{conge.dateReprise.substr(0, 10)}</td>
                                                    <td>{conge.Type}</td>
                                                    {conge.isValidated ? <td>Validé</td> : <td>Non validé</td>}
                                                    <td><button className="btn btn-success my-2 my-sm-0" onClick={() => this.Validateconge(conge.id)} >Valider</button></td>
                                                    <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deleteconge(conge.id)} >Supprimer</button></td>
                                                </tr> : null) : null))}
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

            </div>
        )
    }
}

export default CongesValider;