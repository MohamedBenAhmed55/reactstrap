import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutChefGroupe extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "name": "",
      "chef": "",
      "groupes": [],
      "userId": "",
      "dateDeb": "",
      "dateFin": "",
      "usersnames": [],
      "id":props.modify,
      "groupId":"",
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addChef = this.addChef.bind(this);
    this.updatechef = this.updatechef.bind(this);
    this.storeGrId= this.storeGrId.bind(this);

  }

  addChef() {
    axios.post(`http://localhost:8000/api/chef_groupes`, {
      "name": this.state.name,
      "chef": this.state.chef,
      "groupes": this.state.groupeId,
      "userId": this.state.UserID,
      "dateDeb": this.state.dateDeb,
      "dateFin": this.state.dateFin,
    }).catch(err => {
      alert("l'opération a échoué ")
    })
  }


  getUserNames() {
    axios.get(`http://localhost:8000/api/users_Names`).then(response => {
      this.setState({ usersnames: response.data['data'] })
     

    }).catch(err => {
      alert("l'opération a échoué ")
    })
  }

  getGroupNames() {
    axios.get(`http://localhost:8000/api/groupes_Names`).then(response => {
      this.setState({ groupes: response.data['data'] })
      console.log('groupes', {
        "groupes": this.state.groupes,

        });

    }).catch(err => {
      alert("l'opération a échoué ")
    })
  }

  storeGrId(id){
    this.setState({groupId: id})
  }

  componentDidMount() {
    this.getUserNames();
    this.setFields();
    this.getGroupNames();
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
        "groupe": this.state.groupId,
        "userId": this.state.UserID,
        "dateDeb": this.state.dateDeb,
        "dateFin": this.state.dateFin,
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    }).catch(err => {
      alert("l'opération a échoué ")
    })
  }

  setFields() {
    if (this.props.data) {
      this.setState({
        "name": this.data.props.name,
        "chef": this.data.props.chef,
        "groupes": this.data.props.groupes,
        "userId": this.data.props.UserId,
        "dateDeb": this.data.props.dateDeb,
        "dateFin": this.data.props.dateFin,
      });

    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.data){
      this.updatechef(this.state.id);
    }
    else{
      this.addChef();
  }
}



  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>

          <Col md>
            <Form.Group as={Col} controlId="formSalleId"> 
              <Form.Label>User</Form.Label>
              <Form.Control as="select" defaultValue="01" required>
                {this.state.usersnames.map(user =>
                  <option>{user.id}</option>)
                }
              </Form.Control>
            </Form.Group>

          </Col>

          </Row>
          <Row>

          <Col md>
            <Form.Group as={Col} controlId="formSalleId">
              <Form.Label>Groupe</Form.Label>
              <Form.Control as="select" defaultValue="01" required>
                {this.state.groupes.map(group =>
                  <option >{group.id} </option>)
                }
              </Form.Control>
            </Form.Group>

          </Col>
        </Row>
        <Row>

          <Col md>
            <Form.Group controlId="formDateDeb">
              <Form.Label>Date début</Form.Label>
              <Form.Control type="datetime-local" value={this.state.dateDeb} name="dateDeb" required onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formDateFin">
              <Form.Label>Date Fin</Form.Label>
              <Form.Control type="datetime-local" value={this.state.dateemb} name="dateemb" onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>

        <Button variant="secondary" type="submit">Ajouter Chef</Button>
      </Form>
    )
  }
}

export default FormAjoutChefGroupe;