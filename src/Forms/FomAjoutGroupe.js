import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutGroupe extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "name": "",
      "chef": "",
      "company_id": "",
      "id":props.modify
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addPoste() {
    axios.post(`http://localhost:8000/api/groupes`, {

      "name": this.state.name,
      "chef": this.state.chef,
    })

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }



  handleSubmit(e) {
    e.preventDefault();
    if (this.props.data){
      this.updateGroup(this.state.id);
    }
    else{

    axios.post(`http://localhost:8000/api/groupes`, {
      "name": this.state.name,
      "chef": this.state.chef,
      "company_id": this.state.company_id,
    })
      .then(res => {
        console.log({
          "name": this.state.name,
          "chef": this.state.chef,
          "company_id": this.state.company_id,
        });
      })
  }
}

  updateGroup(id) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/groupes/${id}`,
      data: {
        "name": this.state.name,
          "chef": this.state.chef,
          "company_id": this.state.company_id,
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    })
  }

  setFields() {
    if (this.props.data) {
      this.setState({ name: this.props.data.name, company_id: this.props.data.company_id, chef:this.props.data.chef });

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
            <Form.Group controlId="formGroupName">
              <Form.Label>Nom du groupe</Form.Label>
              <Form.Control type="text" value={this.state.name} name="name" onChange={this.onChange} />
            </Form.Group>
          </Col>

          <Col md>
            <Form.Group controlId="formChef">
              <Form.Label>Nom du chef</Form.Label>
              <Form.Control type="text" value={this.state.chef} name="chef" onChange={this.onChange} />
            </Form.Group>

          </Col>

        </Row>

        <Button variant="secondary" type="submit" >Ajouter Groupe</Button>
      </Form>
    )
  }
}

export default FormAjoutGroupe;