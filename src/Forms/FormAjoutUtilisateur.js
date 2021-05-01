import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Modal from '../ModalError';

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
      "Salaire": 1000,
      "phone": "",
      "Fax": "",
      "Pays": "",
      "image": "",
      "etatPresence": "",
      "matricule": "",
      "company": "",
      "groupe": "/api/groupes/2",
      "user": "",
      "id": props.modify,
      "show": props.show,
      "message": "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRoleschange = this.onRoleschange.bind(this);
    this.setFields = this.setFields.bind(this);
    this.fieldsControl = this.fieldsControl.bind(this);

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
      url: `http://localhost:8000/api/users/${id}`,
      data: {
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
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    }).then(res => {
      alert("Utilisateur modifié")
    }).catch(err => {
      alert("Opération non aboutie")
    })
  }


  handleSubmit(e) {
    e.preventDefault();

    let message = this.fieldsControl();
    if(message == ""){
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
          alert("Utilisateur ajouté")
        }).catch(err => {
          alert("Opération no aboutie")
        })
    }
  }else{
    alert(message);
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

  componentDidMount() {
    this.setFields();
    this.setState({ company: "/api/companies/" + jwt_decode(localStorage.getItem('token')).company });
    console.log(this.state.show);
    // alert("Hello again! This is how we \n add line breaks to an alert box!")
  }

  fieldsControl() {
    let message = "";
    this.setState({ erreur: false, message: [] });

    if (isNaN(this.state.Fax) || this.state.phone.length != 8) {
      message = message + " Le numero de Fax doit être un nombre \n "
      this.setState({ Fax: this.state.user.Fax })

    }

    if (isNaN(this.state.phone) || this.state.phone.length != 8) {
      message = message + "Le numero de téléphone doit contenir 8 chiffres \n"
      this.setState({ phone: this.state.user.phone })

    }

    if (isNaN(this.state.username)== false) {
      message = message + " le username ne doit pas être un nombre! \n "
      this.setState({ username: this.state.user.username })
    }

    if(this.state.username){
    for (let i = 0; i < this.state.username.length; i++) {
      if (!(this.state.username[i].isNaN)) {
         message = message +"le username ne doit pas contenir un nombre ! \n "
        this.setState({ username: this.state.user.username })
        break;
      }
    }}



    if (!isNaN(this.state.nom)) {
       message = message +" le nom ne doit pas être un nombre ! \n"
      this.setState({ nom: this.state.user.nom })
    }

    if(this.state.nom){
    for (let i = 0; i < this.state.nom.length; i++) {
      if (!(this.state.nom[i].isNaN)) {
         message = message +"le nom ne doit pas contenir un nombre ! \n "
        this.setState({ nom: this.state.user.nom })
        break;
      }
    }}

    if (!isNaN(this.state.prenom)) {
       message = message +" le prenom ne doit pas être un nombre ! \n"
      this.setState({ prenom: this.state.user.prenom })
    }

    if(this.state.prenom){
    for (let i = 0; i < this.state.prenom.length; i++) {
      if (!(this.state.prenom[i].isNaN)) {
         message = message +"le prenom ne doit pas contenir un nombre ! \n "
        this.setState({ prenom: this.state.user.prenom })
        break;
      }
    }}

    if (this.state.email.indexOf("@") == -1 || this.state.email.indexOf(".") == -1) {
       message = message +"mail invalide ! \n"
      this.setState({ email: this.state.user.email })
    }

    if (!isNaN(this.state.prenom)) {
       message = message +" l'adresse ne peux pas être un nombre ! \n"
      this.setState({ Adresse: this.state.user.Adresse })
    }

    return message;
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


          {this.state.show ? <Col md>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
            </Form.Group>

          </Col> : null}


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
              <Form.Control type="number" placeholder="Cin" name="cin" min="00000001" max="99999999" value={this.state.cin} onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formNumero">
              <Form.Label>N°Tel</Form.Label>
              <Form.Control type="phone" placeholder="Numero" name="phone" value={this.state.phone} onChange={this.onChange} />
            </Form.Group>

          </Col>

        </Row>

        <Row>

          <Col md>
            <Form.Group controlId="formNumeroFax">
              <Form.Label>Fax</Form.Label>
              <Form.Control type="Fax" placeholder="Fax" name="Fax" value={this.state.Fax} onChange={this.onChange} />
            </Form.Group>

          </Col>
          <Form.Group as={Col} >
            <Form.Label>Genre</Form.Label>
            <Form.Control as="select" name="Genre" value={this.state.Genre} onChange={this.onChange}>
              <option>M</option>
              <option>F</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row>
          <Col md>
            <Form.Group controlId="formAdresse">
              <Form.Label>Adresse</Form.Label>
              <Form.Control type="text" placeholder="Adresse" name="Adresse" value={this.state.Adresse} onChange={this.onChange} />
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
        <Col md>
            <Form.Group controlId="formSalaire">
              <Form.Label>Salaire</Form.Label>
              <Form.Control type="text" placeholder="montant," name="Salaire" value={this.state.Salaire} onChange={this.onChange} />
            </Form.Group>
          </Col>
        </Row> */}

        <Row>
          <Form.Group as={Col} >
            <Form.Label>Etat présence</Form.Label>
            <Form.Control as="select" name="etatPresence" value={this.state.etatPresence} onChange={this.onChange}>
              <option>Présent</option>
              <option>En congé</option>
              <option>En mission</option>
              <option>En intérim</option>
            </Form.Control>
          </Form.Group>
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