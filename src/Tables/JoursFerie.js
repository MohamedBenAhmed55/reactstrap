import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Forms from '../Forms/FormAjoutJrFer'
import axios from 'axios';
import ModalEntity from '../ModalEntity';


class JourFerie extends Component {

    constructor() {
        super();
        this.state = {
            jours: []
        };
    }

    componentDidMount() {
        this.getJoursFeries();

    }

    getJoursFeries() {
        axios.get(`http://localhost:8000/api/jours_feries`).then(response => {
            this.setState({ jours: response.data['hydra:member'] })
        })
    }

    deleteJour(id) {
        let del = window.confirm("êtes vous sûr ?");
        if (del) {
            axios.delete(`http://localhost:8000/api/jours_feries/${id}`).then(res => {
                alert("élément supprimé!");
                this.getJoursFeries();
                // window.location.reload();
            }
            );
        }
    }

    modifyJour(id) {
        axios.put(`http://localhost:8000/api/jours_feries/${id}`);
    }


    render() {
        return (
            <div>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>

                                <div className="col-md-10 offset-md-1 row-block" >
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>

                                                <th scope="col">Titre</th>
                                                <th scope="col">Date</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.jours.map(jour =>
                                                <tr class="table-light" key={jour.id}>

                                                    <td>{jour.titre}</td>
                                                    <td>{jour.date.substr(0, 10)}</td>
                                                    <td><ModalEntity Buttontitle="Modifier" title="Modifier un jour ferié" body={<Forms body={jour} modify={jour.id} />} /></td>
                                                    <td><Button onClick={() => this.deleteJour(jour.id)} >Remove</Button></td>
                                                </tr>)}

                                        </tbody>
                                    </table>
                                </div>



                            </div>
                        }

                    </div>
                </section>
                <div className="container">
                    <div className={'row'}>
                        <div className="col-md-10 offset-md-1 row-block" >
                            <ModalEntity Buttontitle="Add Jour Ferie" title="Ajouter jour ferie" body={<Forms />} />
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default JourFerie;