import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutUtilisateur extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "username": "",
      "roles": [],
      "password": "",
      "email": "",
      "cin": "",
      "nom": "",
      "prenom": "",
      "dateNai": "",
      "dateEmbauche": "",
      "Genre": "",
      "Adresse": "",
      "Salaire": 0,
      "phone": "",
      "Fax": "",
      "Pays": "",
      "image": "",
      "etatPresence": "",
      "matricule": "",
      "company": "/api/companies/1",
      "groupe": "/api/groupes/2",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRoleschange = this.onRoleschange.bind(this);
    this.setFields = this.setFields.bind(this);
  }



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onRoleschange(e) {
    this.setState({ roles: [].slice.call(e.target.selectedOptions).map(item => item.value) })
    console.log(this.state.roles);
  }


  updateUser(id) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/salles/${id}`,
      data: {
        "name": this.state.name,
        "company_id": this.state.company_id,
        "etage": this.state.etage,
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    })
  }


  handleSubmit(e) {
    e.preventDefault();


    if (this.state.id) {
      this.updateUser(this.state.id);
    }
    else {
      axios.post(`http://localhost:8000/api/users`, {

        "username": this.state.username,
        // "roles": this.state.roles,
        "password": this.state.password,
        "email": this.state.email,
        "cin": this.state.cin,
        "nom": this.state.nom,
        "prenom": this.state.prenom,
        "dateNai": this.state.dateNai,
        "dateEmbauche": this.state.dateEmbauche,
        "Genre": this.state.Genre,
        "Adresse": this.state.Adresse,
        "Salaire": this.state.Salaire,
        "phone": this.state.phone,
        "Fax": this.state.Fax,
        "Pays": this.state.Pays,
        "image": this.state.image,
        "etatPresence": this.state.etatPresence,
        "matricule": this.state.matricule,
        "company": this.state.company,
        "groupe": this.state.groupe,
      })
        .then(res => {
          console.log({
            res
          }
          );
        })
    }
  }

  updateUtilisateur(id) {
    axios.put(`http://localhost:8000/api/users/${id}`, {
      "username": this.state.username,
      // "roles": this.state.roles,
      "password": this.state.password,
      "email": this.state.email,
      "cin": this.state.cin,
      "nom": this.state.nom,
      "prenom": this.state.prenom,
      "dateNai": this.state.dateNai,
      "dateEmbauche": this.state.dateEmbauche,
      "Genre": this.state.Genre,
      "Adresse": this.state.Adresse,
      "Salaire": this.state.Salaire,
      "phone": this.state.phone,
      "Fax": this.state.Fax,
      "Pays": this.state.Pays,
      "image": this.state.image,
      "etatPresence": this.state.etatPresence,
      "matricule": this.state.matricule,
      "company": this.state.company,
      "groupe": this.state.groupe,

    })
      .then(res => {
        console.log({
          "name": this.state.name,
          "company_id": this.state.company_id,
        });
      })
  }

  setFields() {
    if (this.props.data) {
      this.setState({
        "username": this.props.data.username,
        "password": this.props.data.password,
        "email": this.props.data.email,
        "cin": this.props.data.cin,
        "nom": this.props.data.nom,
        "prenom": this.props.data.prenom,
        "dateNai": this.props.data.dateNai,
        "dateEmbauche": this.props.data.dateEmbauche,
        "Genre": this.props.data.Genre,
        "Adresse": this.props.data.Adresse,
        "Salaire": this.props.data.Salaire,
        "phone": this.props.data.phone,
        "Fax": this.props.data.Fax,
        "Pays": this.props.data.Pays,
        "image": this.props.data.image,
        "etatPresence": this.props.data.etatPresence,
        "matricule": this.props.data.matricule,
      });

    }
  }

  componentDidMount(){
    this.setFields();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} />
            </Form.Group>

          </Col>
          <Col md>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
            </Form.Group>

          </Col>


        </Row>
        <Row>

          <Col md>
            <Form.Group controlId="formName">
              <Form.Label>Prenom</Form.Label>
              <Form.Control type="text" placeholder="Prenom" name="prenom" value={this.state.prenom} onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formLastname">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" placeholder="Nom" name="nom" value={this.state.nom} onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>

        <Row>
          <Col md>
            <Form.Group controlId="formCin">
              <Form.Label>Cin</Form.Label>
              <Form.Control type="number" placeholder="Cin" name="cin" size="8" value={this.state.cin} onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formNumero">
              <Form.Label>N°Tel</Form.Label>
              <Form.Control type="phone" placeholder="Numero" name="Fax" value={this.state.Fax} onChange={this.onChange} />
            </Form.Group>

          </Col>

        </Row>
        <Row>

          <Col md>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email " name="email" value={this.state.email} onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>
        <Row>

          <Col md>
            <Form.Group controlId="formDateNais">
              <Form.Label>Date de Naissance</Form.Label>
              <Form.Control type="date" name="dateNai" value={this.state.dateNai} onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formDateEmbauche">
              <Form.Label>Date embauche</Form.Label>
              <Form.Control type="date" name="dateEmbauche" value={this.state.dateEmbauche} onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>
        <Row>
          <Col md>
            <Form.Group controlId="formMatricule">
              <Form.Label>Matricule</Form.Label>
              <Form.Control type="text" placeholder="Matricule" name="matricule" value={this.state.matricule} onChange={this.onChange} />
            </Form.Group>
          </Col>

          <Col md>
            <Form.Group controlId="formPays">
              <Form.Label>Pays</Form.Label>
              <Form.Control type="text" placeholder="Pays" name="Pays" value={this.state.Pays} onChange={this.onChange} />
            </Form.Group>
          </Col>

        </Row>
        {/* <Row>
          <Form.Group as={Col} controlId="my_multiselect_field">
            <Form.Label>Roles</Form.Label>
            <Form.Control as="select" value={this.state.roles} onChange={this.onRoleschange}>
              <option value="field1">ROLE_USER</option>
              <option value="field2">ROLE_ADMIN</option>
            </Form.Control>
          </Form.Group>
        </Row> */}

        <Button variant="secondary" type="submit">Ajouter Utilisateur</Button>
      </Form>
    )
  }
}

export default FormAjoutUtilisateur;