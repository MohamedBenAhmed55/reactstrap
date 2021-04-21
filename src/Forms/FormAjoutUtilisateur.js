import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutUtilisateur extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "groupe_id": "",
      "poste_id": "",
      "username": "",
      "roles": "",
      "password": "",
      "email": "",
      "cin": "",

    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  handleSubmit(e) {
    e.preventDefault();



    axios.post(`http://localhost:8000/api/companies`, {
      "groupe_id": this.state.groupe_id,
      "poste_id": this.state.poste_id,
      "username": this.state.username,
      "roles": this.state.roles,
      "password": this.state.password,
      "email": this.state.email,
      "cin": this.state.cin,
    })
      .then(res => {
        console.log({
          "groupe_id": this.state.groupe_id,
          "poste_id": this.state.poste_id,
          "username": this.state.username,
          "roles": this.state.roles,
          "password": this.state.password,
          "email": this.state.email,
          "cin": this.state.cin,
        });
      })
    this.setState({ number: this.state.number + 1 })
  }


  render() {
    return (
      <Form>
        <Row>
          <Col md>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Example@email.com" />
              <Form.Text className="text-muted">
                We'll never share your email address, trust us!
            </Form.Text>
            </Form.Group>

          </Col>
          <Col md>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>

          </Col>
        </Row>
        <Row>
          <Col md>
            <Form.Group controlId="formName">
              <Form.Label>Preom</Form.Label>
              <Form.Control type="text" placeholder="Prenom" />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formLastname">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" placeholder="Nom" />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formDateNais">
              <Form.Label>Date de Naissance</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formDateEmbauche">
              <Form.Label>Date embauche</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

          </Col>
        </Row>

        <Button variant="secondary" type="submit">Ajouter Utilisateur</Button>
      </Form>
    )
  }
}

export default FormAjoutUtilisateur;