import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Forms from '../Forms/FormAjoutSalle'
import ModalEntity from '../ModalEntity'

import axios from 'axios';

class Salles extends Component {

    constructor() {
        super();
        this.state = { Salles: [] };

    }

    componentDidMount() {
        this.getSalles();
    }


    getSalles() {
        axios.get(`http://localhost:8000/api/salles`).then(response => {
            this.setState({ Salles: response.data['hydra:member'] })
        })
    }

    deleteSalle(id) {
        let confirm = window.confirm("veuillez confirmer")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/companies/${id}`).then(res => { alert("élément supprimé!"); this.getSalles() });
        }
    }



    render() {


        return (
            <div>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>


                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Etage</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.Salles.map(Salle =>
                                            <tr class="table-light" key={Salle.id}>
                                                <td>{Salle.nom}</td>
                                                <td>{Salle.Etage}</td>
                                                <td><ModalEntity Buttontitle="Modifier" title="Modifier salle" body={<Forms body={Salle} modify={Salle.id} />} /></td>
                                                <td><Button onClick={() => this.deleteSalle(Salle.id)} >Remove</Button></td>
                                            </tr>)}

                                    </tbody>
                                </table>
                            </div>




                        }

                    </div>
                </section>
                <div className="container">

                    <ModalEntity Buttontitle="Ajouter Salle" title="Ajouter Salle" body={<Forms />} />


                </div>
            </div>
        )
    }
}

export default Salles;