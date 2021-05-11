import React, { Component } from 'react';
import axios from 'axios';
import { Button, Jumbotron } from 'react-bootstrap';
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
        let confirm = window.confirm("êtes-vous sûr ?")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/groupes/${id}`).then(res => { alert("group supprimé!"); this.getGroupes() });
        }
    }


    render() {

        return (

            <div style={{marginTop:70}}>
            <Jumbotron style={{"text-align":"center", "margin-top":"10px", "fontWeight":"bold"}}>
                    <h1 className="display-3">La Liste Des Groupes</h1>                    
                </Jumbotron>
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
                                                    <td>  <ModalEntity Buttontitle="Modifier" title="Modifer un groupe" body={<Forms />} modify={groupe.id} data={groupe} /></td>
                                                    <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deleteGroup(groupe.id)} >supprimer</button></td>

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