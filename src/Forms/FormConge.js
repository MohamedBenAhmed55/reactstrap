import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import jwt_decode from "jwt-decode";

class FormConge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Conges:[],
            CompanyId:jwt_decode(localStorage.getItem('token')).company,
             UserId:jwt_decode(localStorage.getItem('token')).UserId,
            "dateDeb": "",
            "dateFin": "",
            "dateReprise": "",
            "Type": "",
            "isValidated": false,
            "user": "",

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        this.getUsernames();
        if(this.state.tache){
            this.setFields();
        }
    }

    getUsernames() {
        axios.get(`http://localhost:8000/api/users_Names`).then(response => {
            this.setState({ Usernames: response.data['data'] })
            console.log('Usernames', {
                "Usernames": this.state.Usernames,
            });
        }).catch(err => {
            alert("l'opération a échoué ")
        })
    }

    setFields() {
        
        this.setState({
            "dateDeb": "",
            "dateFin": "",
            "dateReprise": "",
            "Type": "",
            "isValidated":"" ,
            "user":"",
            "company":"" ,
        })
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let uid = this.getUserId();
        if (this.state.tache) {
            this.modifyTache(this.state.id, uid);
        }
        else {
            axios.post(`http://localhost:8000/api/taches`,
                {
                    "company": "/api/companies/" + this.state.company,
                    "libelle": this.state.libelle,
                    "dateDeb": this.state.dateDeb,
                    "dateFin": this.state.dateFin,
                    "description": this.state.description,
                    "Priorite": this.state.Priorite,
                    "isValidated": this.state.isValidated,
                    "userDestinataire": "/api/users/" + uid,
                })
                .then(res => {
                    window.location.reload()
                }).catch(err => {
                    alert("l'opération a échoué")
                });
        }
    }

    modifyTache(id, uid) {

        axios({
            method: 'patch',
            url: `http://localhost:8000/api/taches/${id}`,
            data: {
                "company": "/api/companies/" + this.state.company,
                "libelle": this.state.libelle,
                "dateDeb": this.state.dateDeb,
                "dateFin": this.state.dateFin,
                "description": this.state.description,
                "Priorite": this.state.Priorite,
                "userDestinataire": "/api/users/" + uid,

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

    getUserId() {
        let uid;
        for (let i = 0; i < this.state.Usernames.length; i++) {
            if (this.state.Usernames[i].name.localeCompare(this.state.userDestinataire) == 0) {
                uid = this.state.Usernames[i].id;
                break;
            }
        }
        return uid;
    }

    getUserdest(){
        let uid;
        for (let i = 0; i < this.state.Usernames.length; i++) {
            if (this.state.Usernames[i].id.localeCompare(this.state.userDestinataire.substr(11,this.state.userDestinataire.length - 11 )) == 0) {
                uid = this.state.Usernames[i].name;
                break;
            }
        }   
        return uid;
    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col md>
                        <Form.Group controlId="formCompanyName">
                            <Form.Label>libelle</Form.Label>
                            <Form.Control type="text" value={this.state.libelle} name="libelle" onChange={this.onChange} />
                        </Form.Group>
                    </Col>

                    <Col md>
                        <Form.Group as={Col} >
                            <Form.Label>Employé concerné</Form.Label>
                            <Form.Control as="select" value={this.state.userDestinataire} name="userDestinataire" onChange={this.onChange}>
                                {this.state.Usernames.map(user =>
                                    <option>{user.name}</option>)
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>


                </Row>
                <Row>
                    <Col md>
                        <Form.Group controlId="formDateDeb">
                            <Form.Label>Date début</Form.Label>
                            <Form.Control type="date" name="dateDeb" value={this.state.dateDeb} onChange={this.onChange} />
                        </Form.Group>

                    </Col>

                    <Col md>
                        <Form.Group controlId="formDateDelai">
                            <Form.Label>Date délai</Form.Label>
                            <Form.Control type="date" name="dateFin" value={this.state.dateFin} onChange={this.onChange} />
                        </Form.Group>

                    </Col>
                </Row>
                <Col md>
                    <Form.Group as={Col} controlId="formSalleId">
                        <Form.Label>Priorité</Form.Label>
                        <Form.Control as="select" defaultValue="01">
                            <option>Elevé</option>
                            <option>Moyenne</option>
                            <option>Faible</option>
                        </Form.Control>
                    </Form.Group>

                </Col>

                <Row>


                    <Col md>
                        <Form.Group controlId="formPosteName">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="textarea" value={this.state.description} name="description" onChange={this.onChange} />
                        </Form.Group>

                    </Col>
                </Row>

                <Button variant="secondary" type="submit" >Confirmer</Button>
            </Form>
        )
    }


}

export default FormConge;