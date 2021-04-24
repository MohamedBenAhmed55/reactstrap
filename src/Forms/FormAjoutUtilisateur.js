import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutUtilisateur extends Component {

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
      "company": "",
      "groupe": "",
      "poste": "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRoleschange = this.onRoleschange.bind(this);
  }



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onRoleschange(e) {
    this.setState({ roles: [].slice.call(e.target.selectedOptions).map(item => item.value) })
  }


  handleSubmit(e) {
    e.preventDefault();



    axios.post(`http://localhost:8000/api/users`, {

      "username": "string",
      "roles": [
        "string"
      ],
      "password": "string",
      "email": "string",
      "cin": "string",
      "nom": "string",
      "prenom": "string",
      "dateNai": "2021-04-24T20:41:18.259Z",
      "dateEmbauche": "2021-04-24T20:41:18.259Z",
      "Genre": "string",
      "Adresse": "string",
      "Salaire": 0,
      "phone": "string",
      "Fax": "string",
      "Pays": "string",
      "image": "string",
      "etatPresence": "string",
      "matricule": "string",
      "company": "string",
      "groupe": "string",

    })
      .then(res => {
        console.log({

          "username": "string",
          "roles": [
            "string"
          ],
          "password": "string",
          "email": "string",
          "cin": "string",
          "nom": "string",
          "prenom": "string",
          "dateNai": "2021-04-24T20:41:18.259Z",
          "dateEmbauche": "2021-04-24T20:41:18.259Z",
          "Genre": "string",
          "Adresse": "string",
          "Salaire": 0,
          "phone": "string",
          "Fax": "string",
          "Pays": "string",
          "image": "string",
          "etatPresence": "string",
          "matricule": "string",
          "company": "string",
          "groupe": "string",
        }
        );
      })
    this.setState({ number: this.state.number + 1 })
  }


  render() {
    return (
      <Form>
        <Row>
          <Col md>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} />
            </Form.Group>

          </Col>
          <Col md>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Username" name="email" value={this.state.email} onChange={this.onChange} />
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

          <Col md>
            <Form.Group controlId="formCin">
              <Form.Label>Cin</Form.Label>
              <Form.Control type="text" placeholder="Cin" name="cin" value={this.state.cin} onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formDateNais">
              <Form.Label>Date de Naissance</Form.Label>
              <Form.Control type="date" name="dateNai" value={this.state.dateNai} onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formDateEmbauche">
              <Form.Label>Date embauche</Form.Label>
              <Form.Control type="date" name="dateEmbauche" value={this.state.dateEmbauche} onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Form.Group as={Col} controlId="my_multiselect_field">
            <Form.Label>Roles</Form.Label>
            <Form.Control as="select" multiple value={this.state.roles} onChange={this.onRoleschange}>
              <option value="field1">Field 1</option>
              <option value="field2">Field 2</option>
              <option value="field3">Field 3</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Button variant="secondary" type="submit">Ajouter Utilisateur</Button>
      </Form>
    )
  }
}

export default FormAjoutUtilisateur;