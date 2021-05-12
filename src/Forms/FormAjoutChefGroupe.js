import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

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
      "data":props.data,
      "groupId": "",
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addChef = this.addChef.bind(this);
    this.updatechef = this.updatechef.bind(this);
    this.storeGrId = this.storeGrId.bind(this);

  }

  addChef(uid,gid) {
    console.log('info',{
      "name": this.state.name,
      "chef": this.state.chef,
      "groupe": "/api/groupes/" + gid,
      "userId": "/api/users/" + uid,
      "dateDeb": this.state.dateDeb,
      "dateFin": this.state.dateFin,
    })
    // axios.post(`http://localhost:8000/api/chef_groupes`, {
    //   "name": this.state.name,
    //   "chef": this.state.chef,
    //   "groupe": "/api/groupes/" + gid,
    //   "userId": "/api/users/" + uid,
    //   "dateDeb": this.state.dateDeb,
    //   "dateFin": this.state.dateFin,
    // }).catch(err => {
    //   alert("l'opération a échoué ")
    // })
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
        "chef": this.state.chef,
        "groupe": "/api/groupes/" + gid,
        "userId": "/api/users/" + uid,
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
        "groupe": this.data.props.groupe,
        "userId": this.data.props.UserId,
        "dateDeb": this.data.props.dateDeb.substr(0, 10),
        "dateFin": this.data.props.dateFin.substr(0, 10),
      });

    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let uid = this.getUserId();
    let gid = this.getGroupId();
    if (this.props.data) {
      this.updatechef(this.state.id,uid,gid);
    }
    else {
      this.addChef(uid,gid);
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