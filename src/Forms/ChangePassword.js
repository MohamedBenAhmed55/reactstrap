import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "password": "",
      "password_confirm": "",
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
              <Form.Label>Nouvel mot de passe</Form.Label>
              <Form.Control type="password" value={this.state.password} name="password" onChange={this.onChange} />
            </Form.Group>
          </Col>

          <Col md>
            <Form.Group controlId="formPosteName">
              <Form.Label>Confirmer</Form.Label>
              <Form.Control type="password" value={this.state.password_confirm} name="password_confirm" onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>

        <Button variant="secondary" type="submit" >Modifier Password</Button>
      </Form>
    )
  }
}

export default ChangePassword;