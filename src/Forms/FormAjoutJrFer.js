import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutJrFer extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "companyId": "",
      "date": "",
      "titre": "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {

      "companyId": this.state.companyId,
      "date": this.state.date,
      "titre": this.state.titre,
    };

    axios.post(`http://localhost:8000/api/jours_feries`,
      {
        "companyId": this.state.companyId,
        "date": this.state.date,
        "titre": this.state.titre,
      })
      .then(res => {
        console.log({
          "companyId": this.state.companyId,
          "date": this.state.date,
          "titre": this.state.titre,
        });
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md>
            <Form.Group controlId="formcompanyId">
              <Form.Label>Nom du companie</Form.Label>
              <Form.Control type="text" value={this.state.companyId} onChange={this.onChange} />
            </Form.Group>
          </Col>

          <Col md>
            <Form.Group controlId="formheure_deb">
              <Form.Label>Debut d'heures travail</Form.Label>
              <Form.Control type="email" value={this.state.heure_deb} name="heure_deb" onChange={this.onChange} />
            </Form.Group>

          </Col>


          <Col md>
            <Form.Group controlId="formheure_fin">
              <Form.Label>Fin heures travail</Form.Label>
              <Form.Control type="text" placeholder="ville" value={this.state.heure_fin} name="heure_fin" onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>
        <Row>
          <Col md>
            <Form.Group controlId="heure_deb_pause">
              <Form.Label>Debut de pause</Form.Label>
              <Form.Control type="text" placeholder="postalcode" value={this.state.heure_deb_pause} name="heure_deb_pause" onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="heure_fin_pause">
              <Form.Label>Fin de pause</Form.Label>
              <Form.Control type="text" placeholder="Matricule Fiscale" value={this.state.heure_fin_pause} name="heure_fin_pause" onChange={this.onChange} />
            </Form.Group>

          </Col>

          <Col md>
            <Form.Group controlId="is_seance_unique">
              <Form.Label>Seance Unique</Form.Label>
              <Form.Control type="checkbox" value={this.state.is_seance_unique} name="is_seance_unique" onChange={this.onChange} />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="secondary" type="submit" >Ajouter Jour Ferie</Button>
      </Form>
    )
  }
}

export default FormAjoutJrFer;