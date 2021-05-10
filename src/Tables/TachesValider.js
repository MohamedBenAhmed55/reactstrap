import React from 'react';
import { Component } from 'react';
import { Button } from 'react-bootstrap';
import ModalEntity from '../ModalEntity';
import Forms from '../Forms/FormTache';
import validate from '../images/tick.png'
import axios from 'axios';
import jwt_decode from "jwt-decode";


class TachesValider extends Component{

    constructor(props){
        super(props);
        this.state={
            Taches:[],
            Tachesres:[],
            CompanyId:jwt_decode(localStorage.getItem('token')).company,
            UserId:jwt_decode(localStorage.getItem('token')).UserId,
        }

    }

    componentDidMount(){
        this.getTaches();
    }

    getTaches() {
        axios.get(`http://localhost:8000/api/taches`).then(response => {
            this.setState({ Taches: response.data['hydra:member'] })
        })
    }

    Validatetache(id){
        axios({
            method: 'patch',
            url: `http://localhost:8000/api/taches/${id}`,
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
            axios.delete(`http://localhost:8000/api/taches/${id}`).then(res => {
                alert("élément supprimé!");
                this.getTaches();
            }
            );
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
                                        <th scope="col">libelle</th>
                                        <th scope="col">dateDeb</th>
                                        <th scope="col">Delai</th>
                                        <th scope="col">Priorite</th>
                                        <th scope="col">description</th>                                        
                                        <th scope="col">validée</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.Taches.map(tache =>
                                        ( tache.isValidated == false ?     
                                            <tr class="table-light" key={tache.id}>                                           
                                            <td>{tache.libelle}</td>
                                            <td>{tache.dateDeb.substr(0,10)}</td>
                                            <td>{tache.dateFin.substr(0,10)}</td>
                                            <td>{tache.Priorite}</td>
                                            <td>{tache.description}</td>
                                            { tache.isValidated  ? <td>Validée</td> : <td>Non validée</td>}                     
                                            <td><Button onClick={() => this.Validatetache(tache.id)} >Valider</Button></td>
                                        </tr> : null) )}

                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </section>
            
        </div>             
        )
    }
}

export default TachesValider;