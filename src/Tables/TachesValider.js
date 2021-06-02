import React from 'react';
import { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import ModalEntity from '../ModalEntity';
import Forms from '../Forms/FormTache';
import validate from '../images/tick.png'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import ReactPaginate from 'react-paginate';


class TachesValider extends Component{

    constructor(props){
        super(props);
        this.state={
            Taches:[],
            Tachesres:[],
            CompanyId:jwt_decode(localStorage.getItem('token')).company,
            UserId:jwt_decode(localStorage.getItem('token')).UserId,
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 15,
            currentPage: 0,
        }
        this.handlePageClick = this.handlePageClick.bind(this);

    }

    componentDidMount(){
        this.getTaches();
    }

    getTaches() {
        axios.get(`http://localhost:8000/api/taches`).then(response => {
            // this.setState({ Taches: response.data['hydra:member'] })
            var tdata=response.data['hydra:member'];
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                tableData: slice
        })
        })
    }

    Validatetache(id){
        let del = window.confirm("êtes vous sûr ?");
        if (del) {
        axios({
            method: 'patch',
            url: `http://localhost:8000/api/taches/${id}`,
            data: {
                "isValidated":true,
            },
            headers: {
                "Content-Type": 'application/merge-patch+json'
            }
        }).then(res =>{
            alert("Tache validée !")
            this.getTaches();
        }).catch(err => {
            alert("L'opération a échoué");
        })}
    }
           
    deletetache(id){
        let del = window.confirm("êtes vous sûr ?");
        if (del) {
            axios.delete(`http://localhost:8000/api/taches/${id}`).then(res => {
                alert("élément supprimé!");
                this.getTaches();
            }
            )
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

    render(){
        return(
            
            <div style={{marginTop:70}}>
            <Jumbotron style={{"text-align":"center", "margin-top":"10px", "fontWeight":"bold"}}>
                    <h1 className="display-3">Liste des Tâches à valider</h1>                    
                </Jumbotron>
            <section className="row-section">

                <div className="container">
                    {
                        <div className={'row'}>
                        <div className="col-md-10 offset-md-1 row-block" >
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">libelle</th>
                                        <th scope="col">dateDeb</th>
                                        <th scope="col">Delai</th>
                                        <th scope="col">Priorite</th>
                                        <th scope="col">description</th> 
                                        <th scope="col">Etat</th>                                       
                                        <th scope="col">Validation</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.tableData.map((tache,i) =>
                                        (tache.userId == this.state.UserId ?( tache.isValidated == false & tache.Etat == "Terminée"?     
                                            <tr class="table-light" key={tache.id}>                                           
                                            <td>{tache.libelle}</td>
                                            <td>{tache.dateDeb.substr(0,10)}</td>
                                            <td>{tache.dateFin.substr(0,10)}</td>
                                            <td>{tache.Priorite}</td>
                                            <td>{tache.description}</td>
                                            <td>{tache.Etat}</td>
                                            { tache.isValidated  ? <td>Validée</td> : <td>Non validée</td>}                     
                                            <td><button class="btn btn-success" onClick={() => this.Validatetache(tache.id)} >Valider</button></td>
                                            <td><ModalEntity Buttontitle="Modifier" title="Modifier Tache" body={<Forms body={tache} modify={tache.id} show={true} />} /></td>
                                            <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deletetache(tache.id)} >Supprimer</button></td>
                                        </tr> : null):null) )}

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

export default TachesValider;