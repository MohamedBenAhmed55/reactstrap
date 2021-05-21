import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from "jwt-decode";

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
      "Salaire": "",
      "phone": "",
      "Fax": "",
      "Pays": "",
      "image": "default",
      "etatPresence": "",
      "matricule": "",
      "company": "",
      "groupe": "",
      "user": "",
      "id": props.modify,
      "show": props.show,
      "company": jwt_decode(localStorage.getItem('token')).company,
      "groupes": [],
      "postes":[],
      "poste":"",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.onRoleschange = this.onRoleschange.bind(this);
    this.setFields = this.setFields.bind(this);
    this.fieldsControl = this.fieldsControl.bind(this);

  }



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // onRoleschange(e) {
  //   this.setState({ roles: [].slice.call(e.target.selectedOptions).map(item => item.value) })
  //   console.log(this.state.roles);
  // }


  updateUser(id,pid,gid) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/users/${id}`,
      data: {
        "username": this.state.username,
          "roles": [this.state.roles],
          "password": this.state.password,
          "email": this.state.email,
          "cin": this.state.cin,
          "nom": this.state.nom,
          "prenom": this.state.prenom,
          "dateNai": this.state.dateNai,
          "dateEmbauche": this.state.dateEmbauche,
          "Genre": this.state.Genre,
          "Adresse": this.state.Adresse,
          "Salaire": parseInt(this.state.Salaire),
          "phone": this.state.phone,
          "Fax": this.state.Fax,
          "Pays": this.state.Pays,
          "image": this.state.image,
          "etatPresence": this.state.etatPresence,
          "matricule": this.state.matricule,
          "company": "/api/companies/" + this.state.company,
          "groupe": "/api/groupes/" + gid,
          "poste":"/api/postes/" + pid,
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    }).then(res => {
      alert("Utilisateur modifié")
    }).catch(err => {
      alert("Opération non aboutie")
      console.log(err);
    })
  }


  handleSubmit(e) {
    e.preventDefault();
    let message = this.fieldsControl();
    if (message) {
      alert(message)
    }else
    {
      let gid = this.getGrouId();
      let pid = this.getposteId();

      if (this.state.id) {
        this.updateUser(this.state.id,pid,gid);
      }
      else {
        
        console.log('data', {
          "username": this.state.username,
          "roles": [this.state.roles],
          "password": this.state.password,
          "email": this.state.email,
          "cin": this.state.cin,
          "nom": this.state.nom,
          "prenom": this.state.prenom,
          "dateNai": this.state.dateNai,
          "dateEmbauche": this.state.dateEmbauche,
          "Genre": this.state.Genre,
          "Adresse": this.state.Adresse,
          "Salaire": parseInt(this.state.Salaire),
          "phone": this.state.phone,
          "Fax": this.state.Fax,
          "Pays": this.state.Pays,
          "image": this.state.image,
          "etatPresence": this.state.etatPresence,
          "matricule": this.state.matricule,
          "company": "/api/companies/" + this.state.company,
          "groupe": "/api/groupes/" + gid,
          "poste":"/api/postes/" + pid,
        })

        axios.post(`http://localhost:8000/api/users`, {

          "username": this.state.username,
          "roles": [this.state.roles],
          "password": this.state.password,
          "email": this.state.email,
          "cin": this.state.cin,
          "nom": this.state.nom,
          "prenom": this.state.prenom,
          "dateNai": this.state.dateNai,
          "dateEmbauche": this.state.dateEmbauche,
          "Genre": this.state.Genre,
          "Adresse": this.state.Adresse,
          "Salaire": parseInt(this.state.Salaire),
          "phone": this.state.phone,
          "Fax": this.state.Fax,
          "Pays": this.state.Pays,
          "image": this.state.image,
          "etatPresence": this.state.etatPresence,
          "matricule": this.state.matricule,
          "company": "/api/companies/" + this.state.company,
          "groupe": "/api/groupes/" + gid,
          "poste":"/api/postes/" + pid,
        })
          .then(res => {
            alert("Utilisateur ajouté")
          }).catch(err => {
            alert("Opération no aboutie")
          })
      }
    }
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
        "dateNai": this.props.data.dateNai.substr(0,10),
        "dateEmbauche": this.props.data.dateEmbauche.substr(0,10),
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

  componentDidMount() {
    if (this.state.id) { this.setFields(); }
    this.getGroupNames();
    this.getpostesNames();
  }

  fieldsControl() {
    let message = "";

    if (this.state.username & isNaN(this.state.username) == false) {
      message = message + " le username ne doit pas être un nombre! \n "
    }

    var test1 = this.state.username.split("", " ")
    for (let i = 0; i < test1.length; i++) {
      if (!isNaN(test1[i])) {
        message = message + "le username ne peut pas contenir un nombre ! \n"
      }
    }

    if ( this.state.nom & !isNaN(this.state.nom)) {
      message = message + " le nom ne doit pas être un nombre ! \n"
    }

    var test2 = this.state.nom.split("", " ");
    for (let i = 0; i < test2.length; i++) {
      if (!isNaN(test2[i])) {
        message = message + "le nom ne peut pas contenir un nombre ! \n"
      }
    }

    if (this.state.prenom & !isNaN(this.state.prenom)) {
      message = message + " le prenom ne doit pas être un nombre ! \n"
    }

    var test3 = this.state.prenom.split("", " ")
    for (let i = 0; i < test3.length; i++) {
      if (!isNaN(test3[i])) {
        message = message + "le prenom ne peut pas contenir un nombre ! \n"
      }
    }

    if (this.state.Adresse & !isNaN(this.state.Adresse)) {
      message = message + " l'adresse ne peux pas être un nombre ! \n"
    }

    return message;
  }

  getGroupNames() {
    axios.get(`http://localhost:8000/api/groupes_Names`).then(response => {
      this.setState({ groupes: response.data['data'] })
      // console.log('groupes', {
      //   "groupes": this.state.groupes,

      // });
    }).catch(err => {
      alert("l'opération a échoué ")
    })
  }

  getpostesNames() {
    axios.get(`http://localhost:8000/api/postes_Names`).then(response => {
      this.setState({ postes: response.data['data'] })

    }).catch(err => {
      alert("l'opération a échoué ")
    })
  }

  getGrouId() {
    let uid;
    for (let i = 0; i < this.state.groupes.length; i++) {
      if (this.state.groupes[i].name.localeCompare(this.state.groupe) == 0) {
        uid = this.state.groupes[i].id;
        break;
      }
    }
    return uid;
  }

  getposteId() {
    let uid;
    for (let i = 0; i < this.state.postes.length; i++) {
      if (this.state.postes[i].name.localeCompare(this.state.poste) == 0) {
        uid = this.state.postes[i].id;
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
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} required />
            </Form.Group>

          </Col>
          {this.state.show ? <Col md>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} required  />
            </Form.Group>

          </Col> : null}

        </Row>
        <Row>

          <Col md>
            <Form.Group controlId="formName">
              <Form.Label>Prenom</Form.Label>
              <Form.Control type="text" placeholder="Prenom" name="prenom" value={this.state.prenom} onChange={this.onChange} required  />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formLastname">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" placeholder="Nom" name="nom" value={this.state.nom} onChange={this.onChange} required />
            </Form.Group>

          </Col>
        </Row>

        <Row>
          <Col md>
            <Form.Group controlId="formCin">
              <Form.Label>Cin</Form.Label>
              <Form.Control type="number" placeholder="Cin" name="cin" min="00000001" max="99999999" value={this.state.cin} onChange={this.onChange} required />
            </Form.Group>
          </Col>

          <Col md>
            <Form.Group controlId="formNumero">
              <Form.Label>N°Tel</Form.Label>
              <Form.Control type="number" placeholder="Numero" name="phone" min="00000001" max="99999999" value={this.state.phone} onChange={this.onChange} required />
            </Form.Group>

          </Col>

        </Row>

        <Row>

          <Col md>
            <Form.Group controlId="formNumeroFax">
              <Form.Label>Fax</Form.Label>
              <Form.Control type="number" placeholder="Fax" min="00000001" max="99999999" name="Fax" value={this.state.Fax} onChange={this.onChange} required />
            </Form.Group>

          </Col>
          <Col md>
            <Form.Group as={Col} controlId="formSalleId">
              <Form.Label>Genre</Form.Label>
              <Form.Control as="select" defaultValue="01" name="Genre" value={this.state.Genre} onChange={this.onChange} required>
                <option>M</option>
                <option>F</option>
              </Form.Control>
            </Form.Group>

          </Col>
        </Row>

        <Row>
          <Col md>
            <Form.Group controlId="formAdresse">
              <Form.Label>Adresse</Form.Label>
              <Form.Control type="text" placeholder="Adresse" name="Adresse" value={this.state.Adresse} onChange={this.onChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>

          <Col md>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email " name="email" value={this.state.email} onChange={this.onChange} required />
            </Form.Group>

          </Col>
        </Row>
        <Row>

          <Col md>
            <Form.Group controlId="formDateNais">
              <Form.Label>Date de Naissance</Form.Label>
              <Form.Control type="date" name="dateNai" value={this.state.dateNai} onChange={this.onChange} required />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formDateEmbauche">
              <Form.Label>Date embauche</Form.Label>
              <Form.Control type="date" name="dateEmbauche" value={this.state.dateEmbauche} onChange={this.onChange} required />
            </Form.Group>

          </Col>
        </Row>
        <Row>
          <Col md>
            <Form.Group controlId="formMatricule">
              <Form.Label>Matricule</Form.Label>
              <Form.Control type="text" placeholder="Matricule" name="matricule" value={this.state.matricule} onChange={this.onChange} required />
            </Form.Group>
          </Col>

          <Col md>
            <Form.Group controlId="formPays">
              <Form.Label>Pays</Form.Label>
              <Form.Control type="text" placeholder="Pays" name="Pays" value={this.state.Pays} onChange={this.onChange} required />
            </Form.Group>
          </Col>

        </Row>

        <Row>
          <Col md>
            <Form.Group controlId="formSalaire">
              <Form.Label>Salaire</Form.Label>
              <Form.Control type="number" placeholder="montant" name="Salaire" value={this.state.Salaire} onChange={this.onChange} required />
            </Form.Group>
          </Col>

          <Form.Group as={Col} >
            <Form.Label>Etat présence</Form.Label>
            <Form.Control as="select" name="etatPresence" value={this.state.etatPresence} onChange={this.onChange} required >
              <option>Présent</option>
              <option>En congé</option>
              <option>En mission</option>
              <option>En intérim</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label>Poste</Form.Label>
            <Form.Control as="select" name="poste" value={this.state.poste} onChange={this.onChange} required >
            {this.state.postes.map(poste =>
                <option >{poste.name} </option>)
              }
            </Form.Control>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="my_multiselect_field">
            <Form.Label>Roles</Form.Label>
            <Form.Control as="select" name="roles" value={this.state.roles} onChange={this.onChange} required >
              <option>ROLE_USER</option>
              <option>ROLE_LEAD</option>
              <option>ROLE_CLIENT</option>
              <option>ROLE_ADMIN</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formSalleId">
            <Form.Label>Groupe</Form.Label>
            <Form.Control as="select" name="groupe" value={this.state.groupe} onChange={this.onChange} required >
              {this.state.groupes.map(group =>
                <option >{group.name} </option>)
              }
            </Form.Control>
          </Form.Group>
        </Row>

        <Button variant="secondary" type="submit">Confirmer</Button>
      </Form>
    )
  }
}

export default FormAjoutUtilisateur;