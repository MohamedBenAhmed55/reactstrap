import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutPoste extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "name": "",
      "company_id": "",
    };


    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post(`http://localhost:8000/api/postes`, {
      "name": this.state.name,
      "company_id": this.state.company_id,
    })
      .then(res => {
        console.log({
          "name": this.state.name,
          "company_id": this.state.company_id,
        });
      })
  }



  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Nom du companie</Form.Label>
              <Form.Control type="text" value={this.state.company_id} name="company_id" onChange={this.onChange} />
            </Form.Group>
          </Col>

          <Col md>
            <Form.Group controlId="formPosteName">
              <Form.Label>Nom du poste</Form.Label>
              <Form.Control type="text" value={this.state.name} name="name" onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>

        <Button variant="secondary" type="submit" >Ajouter poste</Button>
      </Form>
    )
  }
}

export default FormAjoutPoste;