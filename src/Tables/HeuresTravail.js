import React, { Component } from 'react';
import { Button , Jumbotron} from 'react-bootstrap';
import Forms from '../Forms/FormAjoutHrTravail'
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import ModalEntity from '../ModalEntity';


class HeuresTravail extends Component {

    constructor() {
        super();
        this.state = { Heures: [] };

    }

    componentDidMount() {
        this.getHeures();

    }

    getHeures() {
        axios.get(`http://localhost:8000/api/heures_travails/`).then(response => {
            this.setState({ Heures: response.data['hydra:member'] })
        })
    }

    deleteHeure(id) {
        let confirm = window.confirm("êtes-vous sûr ?")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/heures_travails/${id}`).then(res => { alert("élément supprimé!"); this.getHeures() });
        }
    }

    render() {
        return (
            <div style={{marginTop:70}}>
            <Jumbotron style={{"text-align":"center", "margin-top":"10px", "fontWeight":"bold"}}>
                    <h1 className="display-3">La Liste Des heures du travail</h1>                    
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
                                            {this.state.Heures.map(heure =>
                                                <tr class="table-light" key={heure.id}>


                                                    <td>{heure.heureDeb.substr(11, 8)}</td>
                                                    <td>{heure.heureFin.substr(11, 8)}</td>
                                                    <td>{heure.heureDebPause.substr(11, 8)}</td>
                                                    <td>{heure.heureFinPause.substr(11, 8)}</td>
                                                    <td>{heure.isSeanceUnique ? "Oui" : "Non"}</td>
                                                    <td><ModalEntity Buttontitle="Modifier" title="Modifier heures du travail" body={<Forms />} /></td>
                                                    <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deleteHeure(heure.id)} >Remove</button></td>
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
                        <ModalEntity Buttontitle="Ajouter heures du travail" title="Ajouter utilisateur" body={<Forms />} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeuresTravail;