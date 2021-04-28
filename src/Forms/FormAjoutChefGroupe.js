import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutChefGroupe extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "name": "",
      "chef": "",
      "groupes": "",
      "userId": "",
      "dateDeb": "",
      "dateFin": "",
      "usersnames": []
    };

    this.onChange = this.onChange.bind(this);

  }

  addChef() {
    axios.post(`http://localhost:8000/api/chef_groupes`, {
      "name": this.state.name,
      "chef": this.state.chef,
      "groupes": this.state.groupes,
      "userId": this.state.UserID,
      "dateDeb": this.state.dateDeb,
      "dateFin": this.state.dateFin,
    })

  }


  getUserNames() {
    axios.get(`http://localhost:8000/api/users_Names`).then(response => {
      this.setState({ usersnames: response.data['data'] })

    })
  }

  getGroupNames() {
    axios.get(`http://localhost:8000/api/users_Names`).then(response => {
      this.setState({ usersnames: response.data['data'] })

    })
  }

  componentDidMount() {
    this.getUserNames();
    this.setFields();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updatechef(id) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/chef_groupes/${id}`,
      data: {
        "name": this.state.name,
        "chef": this.state.chef,
        "groupes": this.state.groupes,
        "userId": this.state.UserID,
        "dateDeb": this.state.dateDeb,
        "dateFin": this.state.dateFin,
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    })
  }

  setFields() {
    if (this.props.data) {
      this.setState({
        "name": this.data.props.name,
        "chef": this.data.props.chef,
        "groupes": this.data.props.groupes,
        "userId": this.data.props.UserID,
        "dateDeb": this.data.props.dateDeb,
        "dateFin": this.data.props.dateFin,
      });

    }
  }



  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>

          <Col md>
            <Form.Group as={Col} controlId="formSalleId">
              <Form.Label>User</Form.Label>
              <Form.Control as="select" defaultValue="01">
                {this.state.usersnames.map(user =>
                  <option>{user.name}</option>)
                }
              </Form.Control>
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group as={Col} controlId="formSalleId">
              <Form.Label>Groupe</Form.Label>
              <Form.Control as="select" defaultValue="01">
                {this.state.groupes.map(group =>
                  <option>{group.name}</option>)
                }
              </Form.Control>
            </Form.Group>

          </Col>
        </Row>
        <Row>

          <Col md>
            <Form.Group controlId="formDateDeb">
              <Form.Label>Date début</Form.Label>
              <Form.Control type="date" value={this.state.dateDeb} name="name" onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formDateFin">
              <Form.Label>Date Fin</Form.Label>
              <Form.Control type="date" value={this.state.dateemb} name="name" onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>

        <Button variant="secondary" type="submit">Ajouter Chef</Button>
      </Form>
    )
  }
}

export default FormAjoutChefGroupe;