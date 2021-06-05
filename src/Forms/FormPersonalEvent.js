import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from "jwt-decode";

class FormPersonalEvent extends Component {

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
            "userId": jwt_decode(localStorage.getItem('token')).UserId,
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
                axios.post(`http://localhost:8000/api/personal_events`,
                    {
                        "company": "/api/companies/" + this.state.cid,
                        "title": this.state.titre,
                        "date": this.state.date,
                        "user": "/api/users/" + this.state.userId,
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
            url: `http://localhost:8000/api/personal_events/${id}`,
            data: {
                "company": "/api/companies/" + this.state.cid,
                "title": this.state.titre,
                "date": this.state.date,
                "user": "/api/users/" + this.state.userId,
            },
            headers: {
                "Content-Type": 'application/merge-patch+json'
            }
        }).then(res => {
            alert("Evenement modifié !");
            window.location.reload()
        }).catch(err => {
            alert("Opération non aboutie")
        })
    }

    setFields() {
        if (this.state.jour) {
            this.setState({ titre: this.state.jour.title, date: this.state.jour.date.substr(0, 10) })
        }
    }

    formControl() {
        let message = ""
        if (!isNaN(this.state.titre)) {
            message = message + "le titre de l'événement personnel ne peut pas être un nombre ! \n"
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

export default FormPersonalEvent;