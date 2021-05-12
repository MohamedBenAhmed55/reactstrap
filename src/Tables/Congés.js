import React from 'react';
import { Component } from 'react';
import { Button , Jumbotron} from 'react-bootstrap';
import ModalEntity from '../ModalEntity';
import Forms from '../Forms/FormConge';
import axios from 'axios';
import jwt_decode from "jwt-decode";


class Conges extends Component{

    constructor(props){
        super(props);
        this.state={
            Conges:[],
            CompanyId:jwt_decode(localStorage.getItem('token')).company,
            UserId:jwt_decode(localStorage.getItem('token')).UserId,
            "dateDeb": "",
            "dateFin": "",
            "dateReprise": "",
            "Type": "",
            "isValidated": false,
            "user": "",
        }

    }

    componentDidMount(){
        this.getConges();       
    }

    getConges() {
        axios.get(`http://localhost:8000/api/conges`).then(response => {
            this.setState({ Conges: response.data['hydra:member'] })
        })
    }

    ValidateConge(id){
        axios({
            method: 'patch',
            url: `http://localhost:8000/api/conges/${id}`,
            data: {
                "isValidated":true,
            },
            headers: {
                "Content-Type": 'application/merge-patch+json'
            }
        }).catch(err => {
            alert("L'opération a échoué");
        })}

        deleteConge(id) {
        let del = window.confirm("êtes vous sûr ?");
        if (del) {
            axios.delete(`http://localhost:8000/api/conges/${id}`).then(res => {
                alert("élément supprimé!");
                this.getConges();
            }
            )
        }
    }



    render(){
        return(
            
            <div style={{marginTop:70}}>
            <Jumbotron style={{"text-align":"center", "margin-top":"10px", "fontWeight":"bold"}}>
                    <h1 className="display-3">Vos congés</h1>                    
                </Jumbotron>
            <section className="row-section">

                <div className="container">

                    {
                        <div className={'row'}>


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
                                    {this.state.Conges.map(conge =>
                                        ( conge.user.substr(11,conge.user.length-11) == this.state.UserId ?     
                                            <tr class="table-light" key={conge.id}>                                           
                                            <td>{conge.dateDeb.substr(0,10)}</td>
                                            <td>{conge.dateFin.substr(0,10)}</td>
                                            <td>{conge.dateReprise.substr(0,10)}</td>
                                            <td>{conge.Type}</td>
                                            { conge.isValidated  ? <td>Validé</td> : <td>Non validé</td>}                                                 
                                            <td><ModalEntity Buttontitle="Modifier" title="Modifier Conge" body={<Forms body={conge} modify={conge.id} />} /></td>
                                            <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deletetache(conge.id)} >Supprimer</button></td>                               
                                        </tr> : null) )}

                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </section>
            <div className="container">
                <ModalEntity Buttontitle="Ajouter Conge" title="Ajouter Conge" body={<Forms />} />
            </div>
        </div>             
        )
    }
}

export default Conges;