import React, { Component } from 'react';
import axios from 'axios';
import { Button, Jumbotron } from 'react-bootstrap';
import Forms from '../Forms/FormAjoutChefGroupe';
import ModalEntity from '../ModalEntity';
import { Redirect } from 'react-router-dom';

class ChefGroupe extends Component {

    constructor() {
        super();
        this.state = { Chefs: [], redirect: false };
    }
    componentDidMount() {
        // this.setState({redirect: localStorage.getItem("isLoggedout")})
        this.getChefGroupe();


    }

    getChefGroupe() {
        axios.get(`http://localhost:8000/api/chef_groupes`).then(response => {
            this.setState({ Chefs: response.data['hydra:member'] })
        })
    }

    deleteChef(id) {
        let confirm = window.confirm("êtes-vous sûr ?")
        if (confirm) {
            axios.delete(`http://localhost:8000/api/chef_groupes/${id}`).then(res => {
                alert("chef supprimé!");
                this.getChefGroupe();
            });
        }


    }

    modifyChef(id) {
        axios.put(`http://localhost:8000/api/chef_groupes/${id}`);
    }

    render() {

        return (

            <div style={{marginTop:70}}>
            <Jumbotron style={{"text-align":"center", "margin-top":"10px", "fontWeight":"bold"}}>
                    <h1 className="display-3">La Liste Des chefs de groupe</h1>                    
                </Jumbotron>
                <section className="row-section">

                    <div className="container">

                        {
                            <div className={'row'}>

                                <div className="col-md-10 offset-md-1 row-block" >
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Date Debut</th>
                                                <th scope="col">Date Fin</th>
                                                <th scope="col">Groupe</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.Chefs.map(chef =>
                                                <tr class="table-light" >
                                                    <td>{chef.dateDeb.substr(0, 10)}</td>
                                                    <td>{chef.dateFin.substr(0, 10)}</td>
                                                    <td>{chef.groupes[0]}</td>
                                                    <td><ModalEntity Buttontitle="Modifier" title="Modifier chef" body={<Forms id={chef.id} data={chef} />} /></td>
                                                    <td><button className="btn btn-danger my-2 my-sm-0" onClick={() => this.deleteChef(chef.id)} >Remove</button></td>
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
                            <ModalEntity Buttontitle="Ajouter un chef de groupe" title="Ajouter Chef" body={<Forms />} />
                        </div>
                    </div>
                </div>
                {this.state.redirect ? <Redirect to="/login" /> : null}
            </div>
        )
    }
}

export default ChefGroupe;