import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutSalle extends Component {

    constructor(props) {
        super(props);
        this.state = {

            "name": "",
            "company_id": "",
            "etage": "",
            "id": props.modify,
        };


        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addPoste() {
        axios.post(`http://localhost:8000/api/salles`, {

            "name": this.state.name,
            "company_id": this.state.company_id,
            "etage": this.state.etage,
        })

    }

  updateSalle(id) {
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

  setFields() {
    if (this.props.data) {
      this.setState({ "name": this.props.data.name, "company_id": this.props.data.company_id,etage: this.props.data.etage, });

    }
  }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
    
        if (this.state.id) {
          this.updateSalle(this.state.id);
        }
        else {
          axios.post(`http://localhost:8000/api/salles`, {
            
            "name":this.state.name ,
            "company_id": this.state.company_id,
            "etage": this.state.etage,
          })
            .then(res => {
              console.log({
                "name":this.state.name ,
            "company_id": this.state.company_id,
            "etage": this.state.etage,
              });
            })
        }
      }



    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col md>
                        <Form.Group controlId="formCompanyName">
                            <Form.Label>Nom du companie</Form.Label>
                            <Form.Control type="text" value={this.state.company_id} name="company_id" onChange={this.onChange} />
                        </Form.Group>
                    </Col>

                    <Col md>
                        <Form.Group controlId="formSalleName">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" value={this.state.name} name="name" onChange={this.onChange} />
                        </Form.Group>

                    </Col>

                    <Col md>
                        <Form.Group controlId="formSalleEtage">
                            <Form.Label>Etage</Form.Label>
                            <Form.Control type="text" value={this.state.etage} name="etage" onChange={this.onChange} />
                        </Form.Group>

                    </Col>
                </Row>

                <Button variant="secondary" type="submit" >Ajouter une salle</Button>
            </Form>
        )
    }
}

export default FormAjoutSalle;