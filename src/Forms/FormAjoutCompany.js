import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutCompany extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "name": "",
      "city": "",
      "postalcode": "",
      "email": "",
      "logo": "",
      "matriculeFiscale": "",
      "secteurActivite": "",
      "phone": "",
      "number": 0,
      "id": this.props.modify,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFields =this.setFields.bind(this);
  }

  addCompany() {
    axios.post(`http://localhost:8000/api/companies`, {

      "name": this.state.name,
      "city": this.state.city,
      "postalcode": this.state.postalcode,
      "email": this.state.email,
      "logo": this.state.logo,
      "matriculeFiscale": this.state.matriculeFiscale,
      "secteurActivite": this.state.secteurActivite,
      "phone": this.state.phone,
    })
  }



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  handleSubmit(e) {
    e.preventDefault();
    if (this.props.data) {
      this.UpdateCompany(this.state.id);
    }

    axios.post(`http://localhost:8000/api/companies`, {
      "name": this.state.name,
      "city": this.state.city,
      "postalcode": this.state.postalcode,
      "email": this.state.email,
      "logo": this.state.logo,
      "matriculeFiscale": this.state.matriculeFiscale,
      "secteurActivite": this.state.secteurActivite,
      "phone": this.state.phone,
    }).catch(err => {
      alert("l'opération a échoué ")
    })
    // .then(res => {
    //   console.log({
    //     "name": this.state.name,
    //     "city": this.state.city,
    //     "postalcode": this.state.postalcode,
    //     "email": this.state.email,
    //     "logo": this.state.logo,
    //     "matriculeFiscale": this.state.matriculeFiscale,
    //     "secteurActivite": this.state.secteurActivite,
    //     "phone": this.state.phone,
    //   });
    // })
  }

  setFields() {
    if (this.props.data) {
      this.setState({
        "name": this.props.data.name,
        "city": this.props.data.city,
        "postalcode": this.props.data.postalcode,
        "email": this.props.data.email,
        "logo": this.props.data.logo,
        "matriculeFiscale": this.props.data.matriculeFiscale,
        "secteurActivite": this.props.data.secteurActivite,
        "phone": this.props.data.phone,
      });

    }
  }

  componentDidMount(){
    console.log(this.props.data);
    if(this.props.data){
      this.setFields();
    }
  }

  UpdateCompany(id) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/users/${id}`,
      data: {
        "name": this.state.name,
        "city": this.state.city,
        "postalcode": this.state.postalcode,
        "email": this.state.email,
        "logo": this.state.logo,
        "matriculeFiscale": this.state.matriculeFiscale,
        "secteurActivite": this.state.secteurActivite,
        "phone": this.state.phone,
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    }).catch(err => {
      alert("l'opération a échoué ")
    })
  }

  formControl(){
    let message="";
   if (isNaN(this.state.postalcode)){
     message = message + " le code postal doit être un nombre";
   }

   if(isNaN(this.state.number) || this.state.number.toString.length !=8){
     message= message +" veuillez saisir le numéro correctement"

   }

  }

  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Nom du société</Form.Label>
              <Form.Control type="text" value={this.state.name} name="name" onChange={this.onChange} required/>
            </Form.Group>
          </Col>

          <Col md>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={this.state.email} name="email" onChange={this.onChange} required/>
            </Form.Group>


          </Col>
        </Row>

        <Row>
          <Col md>
            <Form.Group controlId="formVille">
              <Form.Label>ville</Form.Label>
              <Form.Control type="text" placeholder="ville" value={this.state.city} name="city" onChange={this.onChange} required/>
            </Form.Group>

          </Col>
          <Col md>
            <Form.Group controlId="formPostalCode">
              <Form.Label>code postal</Form.Label>
              <Form.Control type="text" placeholder="postalcode" value={this.state.postalcode} name="postalcode" onChange={this.onChange} required/>
            </Form.Group>

          </Col>
        </Row>
        <Row>


          <Col md>
            <Form.Group controlId="formMatriculeFisc">
              <Form.Label>Matricule Fiscale</Form.Label>
              <Form.Control type="text" placeholder="Matricule Fiscale" value={this.state.matriculeFiscale} name="matriculeFiscale" onChange={this.onChange} required />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formSecteurAct">
              <Form.Label>Secteur Activite</Form.Label>
              <Form.Control type="text" placeholder="Secteur Activite" value={this.state.secteurActivite} name="secteurActivite" onChange={this.onChange} required />
            </Form.Group>

          </Col>
        </Row>

        <Row>

          <Col md>
            <Form.Group controlId="formPhone">
              <Form.Label>Numero de telephone</Form.Label>
              <Form.Control type="text" value={this.state.phone} name="phone" onChange={this.onChange} required/>
            </Form.Group>

          </Col>
        </Row>
        <Row>

          <Col md>
            <Form.Group controlId="formLogo">
              <Form.Label>Logo</Form.Label>
              <Form.Control type="text" value={this.state.logo} name="logo" onChange={this.onChange} required/>
            </Form.Group>

          </Col>
        </Row>

        <Button variant="secondary" type="submit" >Ajouter Company</Button>
      </Form>
    )
  }
}

export default FormAjoutCompany;