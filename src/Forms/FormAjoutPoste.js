import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from "jwt-decode";

class FormAjoutPoste extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "name": "",
      "company": "",
      "id": props.modify,

    };


    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePost = this.updatePost.bind(this)
  }

  componentDidMount() {
    this.setFields();    
    // console.log(jwt_decode(localStorage.getItem('token')).company)
    this.setState({company: "/api/companies/" + jwt_decode(localStorage.getItem('token')).company})
    // console.log("/api/companies/" +jwt_decode(localStorage.getItem('token')).company );
    // console.log(this.state.company)
    console.log(this.state.id);

  }

  setFields() {
    if (this.props.data) {
      this.setState({ "name": this.props.data.name, "company": this.props.data.company, });

    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.id) {
      this.updatePost(this.state.id);
    }
    else {
      axios.post(`http://localhost:8000/api/postes`, {
        "name": this.state.name,
        "company": "/api/companies/" + this.state.company_id,
      })
        .then(res => {
          console.log({
            "name": this.state.name,
            "company_id": this.state.company_id,
          });
          alert("poste created !")
        })
    }
  }


  updatePost(id) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/postes/${id}`,
      data: {
        "name": this.state.name,
        "company_id": this.state.company_id,
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    }).then(res =>{
      alert("poste updated !");
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

        <Button variant="secondary" type="submit" >Confirmer</Button>
      </Form>
    )
  }
}

export default FormAjoutPoste;