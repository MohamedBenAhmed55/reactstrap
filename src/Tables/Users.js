import React, { Component } from 'react';
import { Button, Jumbotron, Row, Col } from 'react-bootstrap';
import Forms from '../Forms/FormAjoutUtilisateur'
import axios from 'axios';
import ModalEntity from '../ModalEntity';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


class Users extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            company: "",
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        this.getUsers();
        this.setState({ company: "/api/companies/" + jwtDecode(localStorage.getItem('token')).company });
        console.log("/api/companies/" + jwtDecode(localStorage.getItem('token')).company)

    }

    getUsers() {
        axios.get(`http://localhost:8000/api/users`).then(response => {
            // this.setState({ users: response.data['hydra:member'] })
            // console.log(response.data['hydra:member']);
            var tdata=response.data['hydra:member'];
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                tableData: slice
        })
        console.log(this.state.tabledata)
        })
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
            <div style={{ marginTop: 70 }}>
                <Jumbotron style={{ "text-align": "center", "margin-top": "10px", "fontWeight": "bold", position: 'relative' }}>
                    <h1 className="display-3">Liste Des utilisateurs</h1>
                </Jumbotron>

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
                                        {this.state.tableData.map((user,i) =>
                                        (this.state.company == user.company ?
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
                                                <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deleteUser(user.id)} >Supprimer</button></td>
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


                </section>


                <div style={{ marginLeft: 170 }} >
                    <ModalEntity Buttontitle="Ajouter un utilisateur" title="Ajouter utilisateur" body={<Forms show={true} />} />
                </div>


            </div>
        )
    }
}
export default Users;