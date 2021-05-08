import React from 'react';
import { Component } from 'react';
import { Button } from 'react-bootstrap';
import ModalEntity from '../ModalEntity';
import Forms from '../Forms/FormTache';
import validate from '../images/tick.png'
import axios from 'axios';
import jwt_decode from "jwt-decode";


class Taches extends Component{

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

    Validatetache(id){
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

        deletetache(id) {
        let del = window.confirm("êtes vous sûr ?");
        if (del) {
            axios.delete(`http://localhost:8000/api/conges/${id}`).then(res => {
                alert("élément supprimé!");
                this.getJoursFeries();
            }
            )
        }
    }



    render(){
        return(
            
            <div>
            <section className="row-section">

                <div className="container">

                    {
                        <div className={'row'}>


                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">dateDeb</th>
                                        <th scope="col">dateFin</th>
                                        <th scope="col">dateReprise</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">isValidated</th>                                        
                                        <th scope="col">validée</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.Conges.map(conge =>
                                        ( conge.user.substr(11,tache.user.length-11) == this.state.UserId ?     
                                            <tr class="table-light" key={conge.id}>                                           
                                            <td>{conge.libelle}</td>
                                            <td>{conge.dateDeb.substr(0,10)}</td>
                                            <td>{conge.dateFin.substr(0,10)}</td>
                                            <td>{conge.Priorite}</td>
                                            <td>{conge.description}</td>
                                            { conge.isValidated  ? <td>Validé</td> : <td>Non validé</td>}                                                 
                                            <td><ModalEntity Buttontitle="Modifier" title="Modifier Tache" body={<Forms body={tache} modify={tache.id} />} /></td>
                                            <td><Button onClick={() => this.deletetache(tache.id)} >Supprimer</Button></td>                               
                                        </tr> : null) )}

                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </section>
            <div className="container">
                <ModalEntity Buttontitle="Ajouter Tache" title="Ajouter Tache" body={<Forms />} />
            </div>
        </div>             
        )
    }
}

export default Taches;