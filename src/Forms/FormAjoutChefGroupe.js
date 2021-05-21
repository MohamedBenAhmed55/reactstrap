import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class FormAjoutChefGroupe extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "name": "",
      "chef": "",
      "groupe": "",
      "groupes": [],
      "userId": "",
      "dateDeb": "",
      "dateFin": "",
      "usersnames": [],
      "id": props.modify,
      "data": props.data,
      "groupId": "",
      "company": jwtDecode(localStorage.getItem('token')).company,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addChef = this.addChef.bind(this);
    this.updatechef = this.updatechef.bind(this);
    this.storeGrId = this.storeGrId.bind(this);

  }

  addChef(uid, gid) {
    // console.log('info', {
    //   "company": "/api/companies/" + this.state.company,
    //   "name": this.state.userId,
    //   "groupes": ["/api/groupes/" + gid],
    //   "userId": "/api/users/" + uid,
    //   "dateDeb": this.state.dateDeb,
    //   "dateFin": this.state.dateFin,
    //   "groupname": this.state.groupe
    // })
    this.updateuser(uid,gid)

    axios.post(`http://localhost:8000/api/chef_groupes`, {
      "company": "/api/companies/" + this.state.company,
      "name": this.state.userId,
      "groupes": ["/api/groupes/" + gid],
      "userId": "/api/users/" + uid,
      "dateDeb": this.state.dateDeb,
      "dateFin": this.state.dateFin,
      "groupname": this.state.groupe
    }).then(res => {
      alert("Succès !")
    }).catch(err => {
      alert("l'opération a échoué ")
    })
  }

  updateuser(id,gid){
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/users/${id}`,
      data: {
          "roles": ["ROLE_LEAD"],
          "groupes": ["/api/groupes/" + gid],
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    }).catch(err => {
      alert("Opération user non aboutie")
      console.log(err);
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

  storeGrId(id) {
    this.setState({ groupId: id })
  }

  componentDidMount() {
    this.getUserNames();
    this.setFields();
    this.getGroupNames();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updatechef(id, uid, gid) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/chef_groupes/${id}`,
      data: {
        "company": "/api/companies/" + this.state.company,
        "name": this.state.userId,
        "groupes": ["/api/groupes/" + gid],
        "userId": "/api/users/" + uid,
        "dateDeb": this.state.dateDeb,
        "dateFin": this.state.dateFin,
        "groupname": this.state.groupe
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
        "groupe": this.state.data.groupes,
        "userId": this.state.data.userId,
        "dateDeb": this.state.data.dateDeb.substr(0, 10),
        "dateFin": this.state.data.dateFin.substr(0, 10),
      });

    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let uid = this.getUserId();
    let gid = this.getGroupId();
    if (this.props.data) {
      this.updatechef(this.state.id, uid, gid);
    }
    else {
      this.addChef(uid, gid);
    }
  }

  getUserId() {
    let uid;
    for (let i = 0; i < this.state.usersnames.length; i++) {
      if (this.state.usersnames[i].name.localeCompare(this.state.userId) == 0) {
        uid = this.state.usersnames[i].id;
        break;
      }
    }
    return uid;
  }

  getGroupId() {
    let uid;
    for (let i = 0; i < this.state.groupes.length; i++) {
      if (this.state.groupes[i].name.localeCompare(this.state.groupe) == 0) {
        uid = this.state.groupes[i].id;
        break;
      }
    }
    return uid;
  }




  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>

          <Col md>
            <Form.Group as={Col} controlId="formSalleId">
              <Form.Label>User</Form.Label>
              <Form.Control as="select" defaultValue="01" required name="userId" value={this.state.userId} onChange={this.onChange} >
                {this.state.usersnames.map(user =>
                  <option>{user.name}</option>)
                }
              </Form.Control>
            </Form.Group>

          </Col>

        </Row>
        <Row>

          <Col md>
            <Form.Group as={Col} controlId="formSalleId">
              <Form.Label>Groupe</Form.Label>
              <Form.Control as="select" defaultValue="01" required name="groupe" value={this.state.groupe} onChange={this.onChange}>
                {this.state.groupes.map(group =>
                  <option >{group.name} </option>)
                }
              </Form.Control>
            </Form.Group>

          </Col>
        </Row>
        <Row>

          <Col md>
            <Form.Group controlId="formDateDeb">
              <Form.Label>Date début</Form.Label>
              <Form.Control type="date" value={this.state.dateDeb} name="dateDeb" required onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formDateFin">
              <Form.Label>Date Fin</Form.Label>
              <Form.Control type="date" value={this.state.dateFin} name="dateFin" onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>

        <Button variant="secondary" type="submit">Confirmer</Button>
      </Form>
    )
  }
}

export default FormAjoutChefGroupe;