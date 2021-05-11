import React, { Component } from 'react';
import axios from 'axios';
import { Button, Jumbotron } from 'react-bootstrap';
import Forms from '../Forms/FormAjoutPoste';
import ModalEntity from '../ModalEntity';
import jwt_decode from "jwt-decode";

class Postes extends Component {

    constructor() {
        super();
        this.state = { Postes: [], companyId: "" };

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
        let confirm = window.confirm("êtes-vous sûr ?")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/postes/${id}`).then(res => { alert("élément supprimé!"); this.getPostes() });
        }
    }


    render() {

        return (

            <div style={{marginTop:70}}>
            <Jumbotron style={{"text-align":"center", "margin-top":"10px", "fontWeight":"bold"}}>
                    <h1 className="display-3">La Liste Des postes</h1>                    
                </Jumbotron>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>

                                <div className="col-md-10 offset-md-1 row-block" >
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.Postes.map(poste =>
                                                <tr class="table-light" key={poste.id} >

                                                    <td>{poste.name}</td>                                                   
                                                    <td><ModalEntity Buttontitle="Modify" title="Modifier poste" body={<Forms modify={poste.id} data={poste} />} /></td>
                                                    <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deletePoste(poste.id)} >Remove</button></td>
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
                            <ModalEntity Buttontitle="Ajouter poste" title="Ajouter Poste" body={<Forms />} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Postes;