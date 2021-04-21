import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutCompany extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "name": "",
      "city": "",
      "postalcode": "",
      "email": "",
      "logo": "",
      "matriculeFiscale": "",
      "secteurActivite": "",
      "phone": "",
      "number": 0,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addCompany() {
    axios.post(`http://localhost:8000/api/companies`, {

      "name": this.state.name,
      "city": this.state.city,
      "postalcode": this.state.postalcode,
      "email": this.state.email,
      "logo": this.state.logo,
      "matriculeFiscale": this.state.matriculeFiscale,
      "secteurActivite": this.state.secteurActivite,
      "phone": this.state.phone,
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  handleSubmit(e) {
    e.preventDefault();

    const data = {

      "name": this.state.name,
      "city": this.state.city,
      "postalcode": this.state.postalcode,
      "email": this.state.email,
      "logo": this.state.logo,
      "matriculeFiscale": this.state.matriculeFiscale,
      "secteurActivite": this.state.secteurActivite,
      "phone": this.state.phone,
    };

    axios.post(`http://localhost:8000/api/companies`, {
      "name": this.state.name,
      "city": this.state.city,
      "postalcode": this.state.postalcode,
      "email": this.state.email,
      "logo": this.state.logo,
      "matriculeFiscale": this.state.matriculeFiscale,
      "secteurActivite": this.state.secteurActivite,
      "phone": this.state.phone,
    })
      .then(res => {
        console.log({
          "name": this.state.name,
          "city": this.state.city,
          "postalcode": this.state.postalcode,
          "email": this.state.email,
          "logo": this.state.logo,
          "matriculeFiscale": this.state.matriculeFiscale,
          "secteurActivite": this.state.secteurActivite,
          "phone": this.state.phone,
        });
      })
    this.setState({ number: this.state.number + 1 })
  }


  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Nom du companie</Form.Label>
              <Form.Control type="text" value={this.state.name} name="name" onChange={this.onChange} />
            </Form.Group>
          </Col>

          <Col md>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" value={this.state.email} name="email" onChange={this.onChange} />
            </Form.Group>


          </Col>


          <Col md>
            <Form.Group controlId="formVille">
              <Form.Label>ville</Form.Label>
              <Form.Control type="text" placeholder="ville" value={this.state.city} name="city" onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>
        <Row>
          <Col md>
            <Form.Group controlId="formPostalCode">
              <Form.Label>code postal</Form.Label>
              <Form.Control type="text" placeholder="postalcode" value={this.state.postalcode} name="postalcode" onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formMatriculeFisc">
              <Form.Label>Matricule Fiscale</Form.Label>
              <Form.Control type="text" placeholder="Matricule Fiscale" value={this.state.matriculeFiscale} name="matriculeFiscale" onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formSecteurAct">
              <Form.Label>Secteur Activite</Form.Label>
              <Form.Control type="text" placeholder="Secteur Activite" value={this.state.secteurActivite} name="secteurActivite" onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formPhone">
              <Form.Label>Numero de telephone</Form.Label>
              <Form.Control type="text" value={this.state.phone} name="phone" onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formLogo">
              <Form.Label>Logo</Form.Label>
              <Form.Control type="text" value={this.state.logo} name="logo" onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>

        <Button variant="secondary" type="submit" >Ajouter Company</Button>
      </Form>
    )
  }
}

export default FormAjoutCompany;