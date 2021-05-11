import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class FormAjoutSalle extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "name": "",
      "company_id": jwtDecode(localStorage.getItem('token')).company,
      "etage": "",
      "id": props.modify,
      "data":props.data,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addPoste() {
    axios.post(`http://localhost:8000/api/salles`, {
      "name": this.state.name,
      "company": "/api/companies/" +this.state.company_id,
      "etage": this.state.etage,
    })

  }

  updateSalle(id) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/salles/${id}`,
      data: {
        "name": this.state.name,
        "etage": parseInt(this.state.etage),
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    })
  }

  setFields() {
    if (this.props.data) {
      this.setState({ "name": this.props.data.name, "company_id": this.props.data.company_id, etage: this.props.data.etage, });

    }
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let message =this.formControl();
    if(message){
      alert(message)
    }
    else{
    if (this.state.id) {
      this.updateSalle(this.state.id);
    }
    else {
      console.log('test',{
        "nom": this.state.name,
        "company": "/api/companies/" +this.state.company_id,
        "Etage": parseInt(this.state.etage),
      })
      axios.post(`http://localhost:8000/api/salles`, {

        "nom": this.state.name,
        "company": "/api/companies/" +this.state.company_id,
        "Etage": parseInt(this.state.etage),
      })
        .then(res => {
          alert("succès !");
        }).catch(err =>{
          alert("échec de l'opération")
        })
    }}
  }

  formControl(){
    let message=""
    if(!isNaN(this.state.name)){
      message = message + "le nom de la salle ne peut pas être un nombre ! \n"
    }
  
    var test = this.state.name.split("")
    for(let i=0;i<test.length;i++){
      if (!isNaN(test[i])){
        message = message + "le nom de la salle ne peut pas contenir un nombre ! \n"
      }
    }
    return message;
  }

  componentDidMount(){
    this.setFields();
  }



  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>

          <Col md>
            <Form.Group controlId="formSalleName">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" value={this.state.name} name="name" onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="formSalleEtage">
              <Form.Label>Etage</Form.Label>
              <Form.Control type="number" value={this.state.etage} name="etage" onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>

        <Button variant="secondary" type="submit" >Confirmer</Button>
      </Form>
    )
  }
}

export default FormAjoutSalle;