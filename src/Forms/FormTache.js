import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import jwt_decode from "jwt-decode";

class FormTache extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.modify,
            tache: props.body,
            "libelle": "",
            "dateDeb": "",
            "dateFin": "",
            "description": "",
            "Priorite": "",
            "isValidated": false,
            "userDestinataire": "",
            "user_dest": "",
            "company": jwt_decode(localStorage.getItem('token')).company,
            "user": jwt_decode(localStorage.getItem('token')).UserId,
            "Usernames": [],

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        this.getUsernames();
        if (this.state.tache) {
            this.setFields();
        }
    }

    getUsernames() {
        axios.get(`http://localhost:8000/api/users_Names`).then(response => {
            this.setState({ Usernames: response.data['data'] })
            console.log('Usernames', {
                "Usernames": this.state.Usernames,
            });
        }).catch(err => {
            alert("l'opération a échoué ")
        })
    }

    setFields() {
        this.setState({
            "libelle": this.state.tache.libelle,
            "dateDeb": this.state.tache.dateDeb,
            "dateFin": this.state.tache.dateFin,
            "description": this.state.tache.description,
            "Priorite": this.state.tache.Priorite,
            "userDestinataire": this.state.tache.user_dest,
        })
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let uid = this.getUserId();
        if (this.state.tache) {
            this.modifyTache(this.state.id, uid);
        }
        else {
            // console.log( 'test',{
            //     "company": "/api/companies/" + this.state.company,
            //     "libelle": this.state.libelle,
            //     "dateDeb":  this.state.dateDeb,
            //     "dateFin": this.state.dateFin,
            //     "description": this.state.description,
            //     "Priorite":  this.state.Priorite,
            //     "isValidated":this.state.isValidated,
            //     "userDestinataire":"/api/users/" + uid,
            //     "userId":this.state.user});

            axios.post(`http://localhost:8000/api/taches`,
                {
                    "company": "/api/companies/" + this.state.company,
                    "libelle": this.state.libelle,
                    "dateDeb": this.state.dateDeb,
                    "dateFin": this.state.dateFin,
                    "description": this.state.description,
                    "Priorite": this.state.Priorite,
                    "isValidated": this.state.isValidated,
                    "userDestinataire": "/api/users/" + uid,
                    "userId": "" + this.state.user,
                })
                .then(res => {
                    window.location.reload();
                    alert("succès")
                }).catch(err => {
                    alert("l'opération a échoué")
                });
        }
    }

    modifyTache(id, uid) {

        axios({
            method: 'patch',
            url: `http://localhost:8000/api/taches/${id}`,
            data: {
                "company": "/api/companies/" + this.state.company,
                "libelle": this.state.libelle,
                "dateDeb": this.state.dateDeb,
                "dateFin": this.state.dateFin,
                "description": this.state.description,
                "Priorite": this.state.Priorite,
                "isValidated": this.state.isValidated,
                "userDestinataire": "/api/users/" + uid,

            },
            headers: {
                "Content-Type": 'application/merge-patch+json'
            }
        }).then(res => {
            window.location.reload()
        }).catch(err => {
            alert("Opération non aboutie")
        })

    }

    getUserId() {
        let uid;
        for (let i = 0; i < this.state.Usernames.length; i++) {
            if (this.state.Usernames[i].name.localeCompare(this.state.userDestinataire) == 0) {
                uid = this.state.Usernames[i].id;
                break;
            }
        }
        return uid;
    }

    getUserdest() {
        let uid;
        for (let i = 0; i < this.state.Usernames.length; i++) {
            if (this.state.Usernames[i].id.localeCompare(this.state.userDestinataire.substr(11, this.state.userDestinataire.length - 11)) == 0) {
                uid = this.state.Usernames[i].name;
                break;
            }
        }
        return uid;
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col md>
                        <Form.Group controlId="formLibelle">
                            <Form.Label>libelle</Form.Label>
                            <Form.Control type="text" value={this.state.libelle} name="libelle" onChange={this.onChange} />
                        </Form.Group>
                    </Col>

                    <Col md>
                        <Form.Group as={Col} >
                            <Form.Label>Employé concerné</Form.Label>
                            <Form.Control as="select" value={this.state.userDestinataire} name="userDestinataire" onChange={this.onChange}>
                                {this.state.Usernames.map(user =>
                                    <option>{user.name}</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>


                </Row>
                <Row>
                    <Col md>
                        <Form.Group controlId="formDateEmbauche">
                            <Form.Label>Date début</Form.Label>
                            <Form.Control type="date" name="dateDeb" value={this.state.dateDeb} onChange={this.onChange} required />
                        </Form.Group>

                    </Col>

                    <Col md>
                        <Form.Group controlId="formDateEmbauche">
                            <Form.Label>Date delai</Form.Label>
                            <Form.Control type="date" name="dateFin" value={this.state.dateFin} onChange={this.onChange} required />
                        </Form.Group>

                    </Col>
                </Row>
                <Col md>
                    <Form.Group as={Col} controlId="formSalleId">
                        <Form.Label>Priorité</Form.Label>
                        <Form.Control as="select" defaultValue="01" name="Priorite" value={this.state.Priorite} onChange={this.onChange}>
                            <option>Elevé</option>
                            <option>Moyenne</option>
                            <option>Faible</option>
                        </Form.Control>
                    </Form.Group>

                </Col>

                <Row>
                    <Col md>
                        <Form.Group controlId="formPosteName">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="textarea" value={this.state.description} name="description" onChange={this.onChange} />
                        </Form.Group>

                    </Col>
                </Row>
                <Button variant="secondary" type="submit" >Confirmer</Button>
            </Form>
        )
    }
}

export default FormTache;