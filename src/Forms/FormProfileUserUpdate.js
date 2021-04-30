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
            "error":false,
            "message":"",
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
        console.log(message);
        if(message== "")
       { axios({
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
        }).catch(err => {
            alert("L'opération a échoué");
        })}
        else{
            this.setState({erreur: true})
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
       let message="";
        if (isNaN(this.state.Fax)) {
            message=  " Le numero de Fax doit être un nombre" + " / ";
            this.setState({Fax: this.state.user.Fax})

         }

         if (isNaN(this.state.phone)) {
            message=message +  " Le numero de tel doit être un nombre" + " / "
            this.setState({phone: this.state.user.phone})

         }

         if (!isNaN(this.state.username)){
             message = message + " le username ne doit pas être un nombre!" + 
             this.setState({username: this.state.user.username})
         }

         for(let i=0;i<this.state.username.length;i++){
             if (!this.state.username[i].isNaN){
                 message = message + "le username ne doit pas contenir un nombre !" + 
                 this.setState({username: this.state.user.username}) 
                 break;
             }
         }

        

         if (!isNaN(this.state.nom)){
            message = message + " le nom ne doit pas être un nombre !"  
            this.setState({nom: this.state.user.nom})
        }

        for(let i=0;i<this.state.nom.length;i++){
            if (!this.state.nom[i].isNaN){
                message = message +"le nom ne doit pas contenir un nombre ! "  
                this.setState({nom: this.state.user.nom})
                break;
            }
        }

        if (!isNaN(this.state.prenom)){
            message = message + " le prenom ne doit pas être un nombre !" + 
            this.setState({prenom: this.state.user.prenom})
        }

        for(let i=0;i<this.state.prenom.length;i++){
            if (!this.state.prenom[i].isNaN){
                message = message + "le prenom ne doit pas contenir un nombre ! " 
                this.setState({prenom: this.state.user.prenom})
                break;
            }
        }

        if (this.state.email.indexOf("@")==-1 || this .state.email.indexOf(".") == -1 ) {
            message = message +"mail invalide !" 
            this.setState({email: this.state.user.email})

        }
                
        this.setState({erreur:true, message: message})       
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
                            <Form.Control type="tel" placeholder="Numero" name="phone" value={this.state.phone} onChange={this.onChange} required />
                        </Form.Group>

                    </Col>

                </Row>
                <Row>


                    <Col md>
                        <Form.Group controlId="formNumero">
                            <Form.Label>Fax</Form.Label>
                            <Form.Control type="tel" placeholder="Numero" name="Fax" value={this.state.Fax} onChange={this.onChange} required />
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