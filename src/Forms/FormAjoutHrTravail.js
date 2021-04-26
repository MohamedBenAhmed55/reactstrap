import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Forms.css'

class FormAjoutHrTravail extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "companyId": "",
      "heure_deb": "",
      "heure_fin": "",
      "heure_deb_pause": "",
      "heure_fin_pause": "",
      "is_seance_unique": "",
    };
    this.onChange = this.onChange.bind(this);

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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {

      "companyId": this.state.companyId,
      "heure_deb": this.state.heure_deb,
      "heure_fin": this.state.heure_fin,
      "heure_deb_pause": this.state.heure_deb_pause,
      "heure_fin_pause": this.state.heure_fin_pause,
      "is_seance_unique": this.state.is_seance_unique,
    };

    axios.post(`http://localhost:8000/api/companies`,
      {
        "name": this.state.name,
        "companyId": this.state.companyId,
        "heure_deb": this.state.heure_deb,
        "heure_fin": this.state.heure_fin,
        "heure_deb_pause": this.state.heure_deb_pause,
        "heure_fin_pause": this.state.heure_fin_pause,
        "is_seance_unique": this.state.is_seance_unique,
      })
      .then(res => {
        console.log({
          "companyId": this.state.companyId,
          "heure_deb": this.state.heure_deb,
          "heure_fin": this.state.heure_fin,
          "heure_deb_pause": this.state.heure_deb_pause,
          "heure_fin_pause": this.state.heure_fin_pause,
          "is_seance_unique": this.state.is_seance_unique,
        });
      });
  }

  updateHrTravail(id){
    axios.put(`http://localhost:8000/api/postes/${id}`, {
      "name": this.state.name,
      "company_id": this.state.company_id,
    })
      .then(res => {
        console.log({
          "name": this.state.name,
          "company_id": this.state.company_id,
        });
      })
  }

  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md>
            <Form.Group controlId="formcompanyId">
              <Form.Label>Nom du companie</Form.Label>
              <Form.Control type="text" value={this.state.companyId} name="companyId" onChange={this.onChange} />
            </Form.Group>
          </Col>

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


        </Row>

        <Button variant="secondary" type="submit" >Ajouter Heures Travail</Button>
      </Form>
    )
  }
}

export default FormAjoutHrTravail;