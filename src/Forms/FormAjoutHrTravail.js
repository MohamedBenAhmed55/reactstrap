import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from "jwt-decode";

class FormAjoutHrTravail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "company": jwt_decode(localStorage.getItem('token')).company,
      "heure_deb": "",
      "heure_fin": "",
      "heure_deb_pause": "",
      "heure_fin_pause": "",
      "is_seance_unique": false,
      "id":props.modify,
      "data":props.data,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);

  }

  addHr() {
    axios.post(`http://localhost:8000/api/companies`, {

      "companyId": this.state.companyId,
      "heure_deb": this.state.heure_deb,
      "heure_fin": this.state.heure_fin,
      "heure_deb_pause": this.state.heure_deb_pause,
      "heure_fin_pause": this.state.heure_fin_pause,
      "is_seance_unique": this.state.is_seance_unique,
    })

  }

  onChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [event.target.name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('test',{
        "company": "/api/companies/" +this.state.company,
        "heureDeb": this.state.heure_deb,
        "heureFin": this.state.heure_fin,
        "heureDebPause": this.state.heure_deb_pause,
        "heureFinPause": this.state.heure_fin_pause,
        "isSeanceUnique": this.state.is_seance_unique,

    })
    
    
    axios.post(`http://localhost:8000/api/heures_travails`,
      {
        "company": "/api/companies/" +this.state.company,
        "heureDeb": this.state.heure_deb,
        "heureFin": this.state.heure_fin,
        "heureDebPause": this.state.heure_deb_pause,
        "heureFinPause": this.state.heure_fin_pause,
        "isSeanceUnique": this.state.is_seance_unique,
      })
      .then(res => {
        console.log("succès !");
      }).catch( err => {
        console.log("echec de l'opération")
      })
  }


  updatehrtravail(id) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/heures_travails/${id}`,
      data: {
        "heure_deb": this.state.heure_deb,
        "heure_fin": this.state.heure_fin,
        "heure_deb_pause": this.state.heure_deb_pause,
        "heure_fin_pause": this.state.heure_fin_pause,
        "is_seance_unique": this.state.is_seance_unique,
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
    })
  }

  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>         

          <Col md>
            <Form.Group controlId="formheure_deb">
              <Form.Label>Debut d'heures travail</Form.Label>
              <Form.Control type="time" min="08:00" max="18:00" value={this.state.heure_deb} name="heure_deb" onChange={this.onChange} />
            </Form.Group>

          </Col>


          <Col md>
            <Form.Group controlId="formheure_fin">
              <Form.Label>Fin heures travail</Form.Label>
              <Form.Control type="time" min="08:00" max="18:00" value={this.state.heure_fin} name="heure_fin" onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>
        <Row>
          <Col md>
            <Form.Group controlId="heure_deb_pause">
              <Form.Label>Debut de pause</Form.Label>
              <Form.Control type="time" min="08:00" max="18:00" value={this.state.heure_deb_pause} name="heure_deb_pause" onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="heure_fin_pause">
              <Form.Label>Fin de pause</Form.Label>
              <Form.Control type="time" min="08:00" max="18:00" value={this.state.heure_fin_pause} name="heure_fin_pause" onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="is_seance_unique">
              <Form.Label>Seance Unique</Form.Label>
              <Form.Control type="checkbox" value={this.state.is_seance_unique} name="is_seance_unique" onChange={this.onChange} />
            </Form.Group>

          </Col>
=
        </Row>

        <Button variant="secondary" type="submit" >Confirmer</Button>
      </Form>
    )
  }
}

export default FormAjoutHrTravail;