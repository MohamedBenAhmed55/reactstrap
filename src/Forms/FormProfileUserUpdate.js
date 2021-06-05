import React, { Component } from 'react';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import Modal from '../ModalError';
import classes from '../ModalError.module.css'

class FormProfileUserUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "username": "",
            "email": "",
            "nom": "",
            "prenom": "",
            "Adresse": "",
            "phone": "",
            "Fax": "",
            "image": "",
            "user": "",
            "id": props.modify,
            "error": false,
            "message": [],
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.setFields = this.setFields.bind(this);
        this.fieldsControl = this.fieldsControl.bind(this);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }


    updateUser(id) {
        let message = this.fieldsControl();
        if (message) {
            alert(message);
        } else {
            axios({
                method: 'patch',
                url: `http://localhost:8000/api/users/${id}`,
                data: {
                    "username": this.state.username,
                    "email": this.state.email,
                    "nom": this.state.nom,
                    "prenom": this.state.prenom,
                    "Adresse": this.state.Adresse,
                    "phone": this.state.phone,
                    "Fax": this.state.Fax,
                },
                headers: {
                    "Content-Type": 'application/merge-patch+json'
                }
            }).then(res => {
                alert("succès")
            }).catch(err => {
                alert("L'opération a échoué");
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.id) {
            this.updateUser(this.state.id);
        }
    }


    // setFields() {

    //         this.setState({
    //             "username": this.state.user.username,
    //             "email": this.state.user.email,
    //             "nom": this.state.user.nom,
    //             "prenom": this.state.user.prenom,
    //             "Adresse": this.state.user.Adresse,
    //             "phone": this.state.user.phone,
    //             "Fax": this.state.user.Fax,

    //         });


    // }

    componentDidMount() {
        // console.log(this.state.id);
        this.getUser(this.state.id);
        // console.log(this.state.user);
        // this.setFields();
    }

    getUser(id) {

        axios.get(`http://localhost:8000/api/users/${id}`).then(response => {
            this.setState({ user: response.data });
            this.setState({
                "username": this.state.user.username,
                "email": this.state.user.email,
                "nom": this.state.user.nom,
                "prenom": this.state.user.prenom,
                "Adresse": this.state.user.Adresse,
                "phone": this.state.user.phone,
                "Fax": this.state.user.Fax,

            });
        })
    }

    fieldsControl() {
        let message = "";

        if (!isNaN(this.state.username)) {
            message = message + " le username ne doit pas être un nombre! \n"
        }

        var test1 = this.state.username.split("")
        for (let i = 0; i < test1.length; i++) {
            if (!isNaN(test1[i])) {
                message = message + "le username ne peut pas contenir un nombre ! \n"
            }
        }

        if (!isNaN(this.state.nom)) {
            message = message + " le nom ne doit pas être un nombre ! \n"
        }

        

        if (!isNaN(this.state.prenom)) {
            message = message + " le prenom ne doit pas être un nombre ! \n"
        }

        var test3 = this.state.prenom.split("")
        console.log(test3);
        for (let i = 0; i < test3.length; i++) {
            if (!isNaN(test3[i]) | test3[i]!="") {
                message = message + " le prenom ne peut pas contenir un nombre ! \n"
                break;
            }

        }
        var test2 = this.state.nom.split("");
        console.log(test2);
        for (let i = 0; i < test2.length; i++) {
            if (!isNaN(test2[i]) | test2[i]!="") {
                message = message + " le nom ne peut pas contenir un nombre ! \n"
                break;
            }
        }

        var test5 = this.state.phone.split("")
        if (test5.length != 8) {
            message = message + " le num tel doit contenir 8 chiffres ! \n"
        }

        var test6 = this.state.Fax.split("")
        if (test6.length != 8) {
            message = message + " le Fax doit contenir 8 chiffres ! \n"
        }

        return message;
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} required />
                            </Form.Group>

                        </Col>
                    </Row>

                    <Row>

                        <Col md>
                            <Form.Group controlId="formName">
                                <Form.Label>Prenom</Form.Label>
                                <Form.Control type="text" placeholder="Prenom" name="prenom" value={this.state.prenom} onChange={this.onChange} required />
                            </Form.Group>

                        </Col>

                        <Col md>
                            <Form.Group controlId="formLastname">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control type="text" placeholder="Nom" name="nom" value={this.state.nom} onChange={this.onChange} required />
                            </Form.Group>

                        </Col>
                    </Row>

                    <Row>


                        <Col md>
                            <Form.Group controlId="formNumero">
                                <Form.Label>N°Tel</Form.Label>
                                <Form.Control type="number" placeholder="Numero" min="00000001" max="99999999" name="phone" value={this.state.phone} onChange={this.onChange} required />
                            </Form.Group>

                        </Col>

                    </Row>
                    <Row>


                        <Col md>
                            <Form.Group controlId="formNumero">
                                <Form.Label>Fax</Form.Label>
                                <Form.Control type="number" placeholder="Numero Fax" min="00000001" max="99999999" name="Fax" value={this.state.Fax} onChange={this.onChange} required />
                            </Form.Group>

                        </Col>

                    </Row>
                    <Row>
                        <Col md>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email " name="email" value={this.state.email} onChange={this.onChange} required />
                            </Form.Group>

                        </Col>
                    </Row>

                    <Button variant="primary" type="submit">Confirmer</Button>

                </Form>

                {/* {this.state.erreur ? <Modal className={classes.modal} body={this.state.message}/> : null }  */}

            </div>

        )
    }
}

export default FormProfileUserUpdate;