import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import Forms from '../Forms/FormPersonalEvent';
import axios from 'axios';
import ModalEntity from '../ModalEntity';
import jwtDecode from 'jwt-decode';


class PersonalEvents extends Component {

    constructor() {
        super();
        this.state = {
            jours: [],
            UserId:jwtDecode(localStorage.getItem('token')).UserId,
        };
    }

    componentDidMount() {
        this.getPersonalEvents();

    }

    getPersonalEvents() {
        axios.get(`http://localhost:8000/api/personal_events`).then(response => {
            this.setState({ jours: response.data['hydra:member'] })
        })
    }

    deleteJour(id) {
        let del = window.confirm("êtes vous sûr ?");
        if (del) {
            axios.delete(`http://localhost:8000/api/personal_events/${id}`).then(res => {
                alert("élément supprimé!");
                this.getPersonalEvents();
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
            <div style={{marginTop:70}}>
            <Jumbotron style={{"text-align":"center", "margin-top":"10px", "fontWeight":"bold"}}>
                    <h1 className="display-3">La Liste Des événements personnels</h1>                    
                </Jumbotron>
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
                                            {this.state.jours.map(event =>
                                                ( event.user.substr(11,event.user.length-11) == this.state.UserId ?
                                                <tr class="table-light" key={event.id}>
                                                

                                                    <td>{event.title}</td>
                                                    <td>{event.date.substr(0, 10)}</td>
                                                    <td><ModalEntity Buttontitle="Modifier" title="Modifier un événement personnel" body={<Forms body={event} modify={event.id} />} /></td>
                                                    <td><button  className="btn btn-danger my-2 my-sm-0" onClick={() => this.deleteJour(event.id)} >Remove</button></td>
                                                </tr>: null) )}

                                        </tbody>
                                    </table>
                                </div>



                            </div>
                        }

                    </div>
                </section>              
            </div>
        )

    }
}

export default PersonalEvents;