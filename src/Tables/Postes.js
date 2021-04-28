import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Forms from '../Forms/FormAjoutPoste';
import ModalEntity from '../ModalEntity';
import jwt_decode from "jwt-decode";

class Postes extends Component {

    constructor() {
        super();
        this.state = { Postes: [], companyId:"" };

        this.deletePoste = this.deletePoste.bind(this);
    }

    componentDidMount() {
        this.getPostes();


    }


    getPostes() {
        axios.get(`http://localhost:8000/api/postes`).then(response => {
            this.setState({ Postes: response.data['hydra:member'] })
            // console.log(response.data['hydra:member']);
        })
    }

    deletePoste(id) {
        axios.delete(`http://localhost:8000/api/postes/${id}`);
        window.location.reload();
        alert("poste deleted!");

    }

    modifyPoste(id) {
        axios.put(`http://localhost:8000/api/postes/${id}`);
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
                                                <th scope="col">Name</th>
                                                <th scope="col">Company</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.Postes.map(poste =>
                                                <tr class="table-light" key={poste.id} >

                                                    <td>{poste.name}</td>
                                                    <td>{poste.company}</td>
                                                    <td><ModalEntity Buttontitle="Modify" title="Modifier poste" body={<Forms modify={poste.id} data={poste} />} /></td>
                                                    <td><Button onClick={() => this.deletePoste(poste.id)} >Remove</Button></td>
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
                        <ModalEntity Buttontitle="Add Poste" title="Ajouter Poste" body={<Forms />} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Postes;