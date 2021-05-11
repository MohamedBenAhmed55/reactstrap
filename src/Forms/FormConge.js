import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import jwt_decode from "jwt-decode";

class FormConge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Conges: [],
            CompanyId: jwt_decode(localStorage.getItem('token')).company,
            UserId: jwt_decode(localStorage.getItem('token')).UserId,
            "dateDeb": "",
            "dateFin": "",
            "dateReprise": "",
            "Type": "",
            "isHalfDay": false,
            "isValidated": false,
            "user": "",
            "conge": props.data,
            "id": props.modify,

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        if (this.state.conge) {
            this.setFields();
        }
    }


    setFields() {

        this.setState({
            "dateDeb": this.state.conge.dateDeb,
            "dateFin": this.state.conge.dateFin,
            "dateReprise": this.state.conge.dateReprise,
            "isHalfDay": this.state.conge.isHalfDay,
            "Type": this.state.conge.Type,
        })
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.conge) {
            this.modifyConge(this.state.id);
        }
        else {
            axios.post(`http://localhost:8000/api/conges`,
                {
                    "company": "/api/companies/" + this.state.CompanyId,
                    "dateDeb": this.state.dateDeb,
                    "dateFin": this.state.dateFin,
                    "dateReprise": this.state.dateReprise,
                    "Type": this.state.Type,
                    "isValidated": this.state.isValidated,
                    "isHalfDay": this.state.isHalfDay,
                    "user": "/api/users" + this.state.UserId,
                })
                .then(res => {
                    window.location.reload();
                    alert("succès ! ")
                }).catch(err => {
                    alert("l'opération a échoué")
                });
        }
    }

    modifyConge(id) {

        axios({
            method: 'patch',
            url: `http://localhost:8000/api/taches/${id}`,
            data: {
                "dateReprise": this.state.dateReprise,
                "dateDeb": this.state.dateDeb,
                "dateFin": this.state.dateFin,
                "Type": this.state.Type,

            },
            headers: {
                "Content-Type": 'application/merge-patch+json'
            }
        }).then(res => {
            window.location.reload()
        }).catch(err => {
            alert("Opération non aboutie")
        })

    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>

                <Row>
                    <Col md>
                        <Form.Group controlId="formDateDeb">
                            <Form.Label>Date début</Form.Label>
                            <Form.Control type="date" name="dateDeb" value={this.state.dateDeb} onChange={this.onChange} required />
                        </Form.Group>

                    </Col>


                </Row>
                <Row>
                    <Col md>
                        <Form.Group controlId="formDateDelai">
                            <Form.Label>Date Fin</Form.Label>
                            <Form.Control type="date" name="dateFin" value={this.state.dateFin} onChange={this.onChange} required />
                        </Form.Group>

                    </Col>
                </Row>

                <Row>
                    <Col md>
                        <Form.Group controlId="formDateDelai">
                            <Form.Label>Date de reprise</Form.Label>
                            <Form.Control type="date" name="dateReprise" value={this.state.dateReprise} onChange={this.onChange} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Col md>
                    <Form.Group as={Col} controlId="formCongeType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" defaultValue="01" name="Type" value={this.state.Type} onChange={this.onChange} required >
                            <option>Annuel</option>
                            <option>Maladie</option>
                            <option>Maternet</option>
                        </Form.Control>
                    </Form.Group>

                </Col>

                <Form>
                    {['checkbox'].map((type) => (
                        <div key={`default-${type}`} >
                            <Form.Check
                                type={type}
                                id={`default-${type}`}
                                label="demi journee" name="isHalfDay" value={this.state.isHalfDay} onChange={this.onChange} required
                            />
                        </div>
                    ))}
                </Form>

                <Button variant="secondary" type="submit" >Confirmer</Button>
            </Form>
        )
    }


}

export default FormConge;