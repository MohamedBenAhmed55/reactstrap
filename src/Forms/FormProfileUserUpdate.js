import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormProfileUserUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "username": "",
            "roles": [],
            "password": "",
            "email": "",
            "cin": "",
            "nom": "",
            "prenom": "",
            "dateNai": "",
            "dateEmbauche": "",
            "Genre": "",
            "Adresse": "",
            "Salaire": 0,
            "phone": "",
            "Fax": "",
            "Pays": "",
            "image": "",
            "etatPresence": "",
            "matricule": "",
            "company": "/api/companies/1",
            "groupe": "/api/groupes/2",
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setFields = this.setFields.bind(this);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    updateUser(id) {
        axios({
            method: 'patch',
            url: `http://localhost:8000/api/salles/${id}`,
            data: {
                "username": this.state.username,
                "email": this.state.email,
                "nom": this.state.nom,
                "prenom": this.state.prenom,
                "Adresse": this.state.Adresse,
                "phone": this.state.phone,
                "Fax": this.state.Fax,
            },
            headers: {
                "Content-Type": 'application/merge-patch+json'
            }
        })
    }


    handleSubmit(e) {
        e.preventDefault();
        if (this.state.id) {
            this.updateUser(this.state.id);
        }

    }

    updateUtilisateur(id) {
        axios.put(`http://localhost:8000/api/users/${id}`, {

            "username": this.state.username,
            "email": this.state.email,
            "nom": this.state.nom,
            "prenom": this.state.prenom,
            "Adresse": this.state.Adresse,
            "phone": this.state.phone,
            "Fax": this.state.Fax,

        })
    }

    setFields() {
        if (this.props.data) {
            this.setState({
                "username": this.props.data.username,
                "email": this.props.data.email,
                "nom": this.props.data.nom,
                "prenom": this.props.data.prenom,
                "Adresse": this.props.data.Adresse,
                "phone": this.props.data.phone,
                "Fax": this.props.data.Fax,

            });

        }
    }

    componentDidMount() {
        this.setFields();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col md>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} />
                        </Form.Group>

                    </Col>
                </Row>

                <Row>

                    <Col md>
                        <Form.Group controlId="formName">
                            <Form.Label>Prenom</Form.Label>
                            <Form.Control type="text" placeholder="Prenom" name="prenom" value={this.state.prenom} onChange={this.onChange} />
                        </Form.Group>

                    </Col>

                    <Col md>
                        <Form.Group controlId="formLastname">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" placeholder="Nom" name="nom" value={this.state.nom} onChange={this.onChange} />
                        </Form.Group>

                    </Col>
                </Row>

                <Row>


                    <Col md>
                        <Form.Group controlId="formNumero">
                            <Form.Label>N°Tel</Form.Label>
                            <Form.Control type="phone" placeholder="Numero" name="Fax" value={this.state.Fax} onChange={this.onChange} />
                        </Form.Group>

                    </Col>

                </Row>
                <Row>
                    <Col md>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email " name="email" value={this.state.email} onChange={this.onChange} />
                        </Form.Group>

                    </Col>
                </Row>

                <Button variant="secondary" type="submit">Ajouter Utilisateur</Button>
            </Form>
        )
    }
}

export default FormProfileUserUpdate;