import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Forms from '../Forms/FomAjoutGroupe'
import ModalEntity from '../ModalEntity';

class Groupes extends Component {

    constructor() {
        super();
        this.state = { Groupes: [] };
    }

    componentDidMount() {
        this.getGroupes();

    }

    getGroupes() {
        axios.get(`http://localhost:8000/api/groupes`).then(response => {
            this.setState({ Groupes: response.data['hydra:member'] })
        })
    }

    deleteGroup(id) {
        axios.delete(`http://localhost:8000/api/groupes/${id}`);
        alert("group deleted!");
        window.location.reload();

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
                                                <th scope="col">Nom du groupe</th>
                                                <th scope="col">chef</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.Groupes.map(groupe =>
                                                <tr class="table-light" >
                                                    <td>{groupe.name}</td>
                                                    <td>{groupe.chef}</td>
                                                    <td>  <ModalEntity Buttontitle="Modifier" title="Modifer un groupe" body={<Forms />} modify={groupe.id} data={groupe}/></td>
                                                    <td><Button onClick={() => this.deleteGroup(groupe.id)} >supprimer</Button></td>
                                                    
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
                        <ModalEntity Buttontitle="Ajouter" title="Ajouter un groupe" body={<Forms />} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Groupes;