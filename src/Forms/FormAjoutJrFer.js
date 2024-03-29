import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from "jwt-decode";

class FormAjoutJrFer extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "companyId": "",
      "date": "",
      "titre": "",
      "CompanyNames": [],
      "jour": props.body,
      "id": props.modify,
      "cid": jwt_decode(localStorage.getItem('token')).company,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    let message = this.formControl();
    if (message) {
      alert(message);
    }
    else {
      if (this.state.jour) {
        this.modifyJour(this.state.id);
      }
      else {
        axios.post(`http://localhost:8000/api/jours_feries`,
          {
            "company": "/api/companies/" + this.state.cid,
            "date": this.state.date,
            "titre": this.state.titre,
          })
          .then(res => {
            alert("succès !")
            // window.location.reload()
          }).catch(err => {
            alert("Opération non aboutie")
          });
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // getCompanyNames() {
  //   axios.get(`http://localhost:8000/api/company_Names`).then(response => {
  //     this.setState({ CompanyNames: response.data['data'] })

  //   })
  // }

  componentDidMount() {
    // this.getCompanyNames();
    this.setFields();
  }


  modifyJour(id) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/jours_feries/${id}`,
      data: {
        "company": "/api/companies/" + this.state.cid,
        "date": this.state.date,
        "titre": this.state.titre,
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    }).then(res => {
      alert("Jour férié modifié !");
      window.location.reload()
    }).catch(err => {
      alert("Opération non aboutie")
    })
  }

  setFields() {
    if (this.state.jour) {
      this.setState({ titre: this.state.jour.titre, date: this.state.jour.date.substr(0,10) })
    }
  }

  formControl() {
    let message = ""
    if (!isNaN(this.state.titre)) {
      message = message + "le titre du jour férié ne peut pas être un nombre ! \n"
    }

    var test = this.state.titre.split("", " ")
    for (let i = 0; i < test.length; i++) {
      if (!isNaN(test[i])) {
        message = message + "le titre du jour férié ne peut pas contenir un nombre ! \n"
      }
    }

    return message;
  }




  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md>
            <Form.Group controlId="FormTitre">
              <Form.Label>Titre</Form.Label>
              <Form.Control type="text" value={this.state.titre} name="titre" onChange={this.onChange} required />
            </Form.Group>

          </Col>


          <Col md>
            <Form.Group controlId="formDate">
              <Form.Label>date</Form.Label>
              <Form.Control type="date" value={this.state.date} name="date" onChange={this.onChange} required />
            </Form.Group>

          </Col>
        </Row>


        <Button variant="secondary" type="submit" >Confirmer</Button>
      </Form>
    )
  }
}

export default FormAjoutJrFer;