import React, {Component} from 'react';
import { Row , Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutCompany extends Component{

    constructor() {
        super();
        this.state = { 
             company:{
               "name": "",
               "city": "",
               "postalcode": "s",
               "email": "",
               "logo": "",
               "matriculeFiscale": "",
               "secteurActivite": "",
               "phone": "",
        }};
        this.handleEmailChange=this.handleEmailChange.bind(this);
    }

    addCompany(){
        axios.post(`http://localhost:8000/api/companies`,{
       
               "name": this.state.user.name,
               "city": this.state.user.city,
               "postalcode": this.state.user.postalcode,
               "email": this.state.user.email,
               "logo": this.state.user.logo,
               "matriculeFiscale": this.state.user.matriculeFiscale,
               "secteurActivite": this.state.user.secteurActivite,
               "phone": this.state.user,
              
             
        })
    
    }
    
    handleEmailChange(event) {
      this.setState({email: event.target.value});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
      }

    render(){

        return(
            <Form>
          <Row>
          <Col md>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Nom du companie</Form.Label>
              <Form.Control type="text" value={this.state.user.name} onChange={this.handleNameChange} />
            </Form.Group>
          </Col>

            <Col md>
            <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Example@email.com" value={this.state.user.email} onChange={this.handleEmailChange}/>
            <Form.Text className="text-muted">
              We'll never share your email address, trust us!
            </Form.Text>
          </Form.Group>

            </Col>
           

            <Col md>
            <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          
            </Col>
            </Row>
            <Row>
            <Col md>
            <Form.Group controlId="formName">
          <Form.Label>Preom</Form.Label>
            <Form.Control type="text" placeholder="Prenom" />
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="formLastname">
          <Form.Label>Nom</Form.Label>
            <Form.Control type="text" placeholder="Nom" />
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="formDateNais">
          <Form.Label>Date de Naissance</Form.Label>
            <Form.Control type="date"  />
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="formDateEmbauche">
          <Form.Label>Date embauche</Form.Label>
            <Form.Control type="date"  />
          </Form.Group>
          
            </Col>
            </Row>
                      
          <Button variant="secondary" type="submit">Ajouter Utilisateur</Button>
        </Form>
        )
    }
}

export default FormAjoutCompany;