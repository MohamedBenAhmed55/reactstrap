import React, { Component } from 'react';
import axios from 'axios';
import { Button, Jumbotron } from 'react-bootstrap';
import Forms from '../Forms/FormAjoutPoste';
import ModalEntity from '../ModalEntity';
import jwt_decode from "jwt-decode";
import ReactPaginate from 'react-paginate';

class Postes extends Component {

    constructor() {
        super();
        this.state = {
            Postes: [],
            companyId: "",
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
        };

        this.deletePoste = this.deletePoste.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.getPostes();
    }


    getPostes() {
        axios.get(`http://localhost:8000/api/postes`).then(response => {
            // this.setState({ Postes: response.data['hydra:member'] })
            var tdata = response.data['hydra:member'];
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                tableData: slice
            })
        })
    }

    deletePoste(id) {
        let confirm = window.confirm("êtes-vous sûr ?")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/postes/${id}`).then(res => { alert("élément supprimé!"); this.getPostes() });
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
                    <h1 className="display-3">Liste Des postes</h1>
                </Jumbotron>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>

                                <div className="col-md-10 offset-md-1 row-block" >
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.tableData.map((poste,i) =>
                                                <tr class="table-light" key={poste.id} >

                                                    <td>{poste.name}</td>
                                                    <td><ModalEntity Buttontitle="Modifier" title="Modifier poste" body={<Forms modify={poste.id} data={poste} />} /></td>
                                                    <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deletePoste(poste.id)} >Supprimer</button></td>
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



                            </div>
                        }

                    </div>
                </section>
                <div className="container">
                    <div className={'row'}>
                        <div className="col-md-10 offset-md-1 row-block" >
                            <ModalEntity Buttontitle="Ajouter poste" title="Ajouter Poste" body={<Forms />} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Postes;