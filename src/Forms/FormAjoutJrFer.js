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
      "CompanyNames": []
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();

    axios.post(`http://localhost:8000/api/jours_feries`,
      {

        "date": this.state.date,
        "titre": this.state.titre,
      })
      .then(res => {
        console.log({
          "date": this.state.date,
          "titre": this.state.titre,
        });
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getCompanyNames() {
    axios.get(`http://localhost:8000/api/company_Names`).then(response => {
      this.setState({ CompanyNames: response.data['data'] })

    })
  }

  componentDidMount() {
    this.getCompanyNames();
  }

  updatepassword(id) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/users/${id}`,
      data: {
        "password": this.state.password,
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
            <Form.Group as={Col} controlId="formSalleId">
              <Form.Label>Company</Form.Label>
              <Form.Control as="select" defaultValue="01">
                {this.state.CompanyNames.map(company =>
                  <option>{company.name}</option>)
                }
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md>
            <Form.Group controlId="FormTitre">
              <Form.Label>Titre</Form.Label>
              <Form.Control type="text" value={this.state.titre} name="titre" onChange={this.onChange} />
            </Form.Group>

          </Col>


          <Col md>
            <Form.Group controlId="formDate">
              <Form.Label>date</Form.Label>
              <Form.Control type="date" value={this.state.date} name="date" onChange={this.onChange} />
            </Form.Group>

          </Col>
        </Row>


        <Button variant="secondary" type="submit" >Ajouter Jour Ferie</Button>
      </Form>
    )
  }
}

export default FormAjoutJrFer;