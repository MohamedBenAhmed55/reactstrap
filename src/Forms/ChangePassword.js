import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "password": "",
      "password_confirm": "",
      "id": props.modify,
    };


    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatepassword = this.updatepassword.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password != this.state.password_confirm) {
      alert("password mismatch");
    }
    else {
      this.updatepassword(this.state.id);
    }
  }

  updatepassword(id) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/users/${id}`,
      data: {
        "password": this.state.password
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    })
  }

  componentDidMount(){
    console.log(this.props.modify)
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