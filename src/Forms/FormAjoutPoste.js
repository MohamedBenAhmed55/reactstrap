import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutPoste extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "name": "",
      "company_id": "",
      "id": props.modify,

    };


    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePost = this.updatePost.bind(this)
  }

  componentDidMount() {
    this.setFields();
  }

  setFields() {
    if (this.props.data) {
      this.setState({ "name": this.props.data.name, "company_id": this.props.data.company_id, });

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
        "company_id": this.state.company_id,
      })
        .then(res => {
          console.log({
            "name": this.state.name,
            "company_id": this.state.company_id,
          });
        })
    }
  }

  // updatePost(id){
  //   let config = {
  //     headers: {
  //       header1: "application/merge-patch+json",
  //     }
  //   }
  //   axios.patch(`http://localhost:8000/api/postes/${id}`, config,{
  //     "name": this.state.name,
  //     "company_id": this.state.company_id,
  //   })
  //     .then(res => {
  //       console.log({
  //         "name": this.state.name,
  //         "company_id": this.state.company_id,
  //       });
  //     })
  // }

  updatePost(id) {
    axios({
      method: 'patch', //you can set what request you want to be
      url: `http://localhost:8000/api/postes/${id}`,
      data: {
        "name": this.state.name,
        "company_id": this.state.company_id,
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
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