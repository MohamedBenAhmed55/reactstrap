import React, {Component} from 'react';
import { Row , Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutCompany extends Component{

    constructor(props) {
        super(props);
        this.state = { 
             
               "name": "",
               "city": "",
               "postalcode": "",
               "email": "",
               "logo": "",
               "matriculeFiscale": "",
               "secteurActivite": "",
               "phone": "",
               "number": 0,
        };
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleCityChange=this.handleCityChange.bind(this);
        this.handlepostalcodeChange=this.handlepostalcodeChange.bind(this);
        this.handlelogoChange=this.handlelogoChange.bind(this);
        this.handlematriculeFiscaleChange=this.handlematriculeFiscaleChange.bind(this);
        this.handlesecteurActiviteChange=this.handlesecteurActiviteChange.bind(this);
        this.handlePhoneChange=this.handlePhoneChange.bind(this); 
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    addCompany(){
        axios.post(`http://localhost:8000/api/companies`,{
       
               "name": this.state.name,
               "city": this.state.city,
               "postalcode": this.state.postalcode,
               "email": this.state.email,
               "logo": this.state.logo,
               "matriculeFiscale": this.state.matriculeFiscale,
               "secteurActivite": this.state.secteurActivite,
               "phone": this.state.phone,         
        })
    
    }
    
    handleEmailChange(event) {
      this.setState({email: event.target.value})
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});       
      }
      
    handleCityChange(event) {
        this.setState({city: event.target.value});       
      }
    handlepostalcodeChange(event) {
        this.setState({postalcode: event.target.value});       
      }
    handlelogoChange(event) {
        this.setState({logo: event.target.value});       
      }
    handlematriculeFiscaleChange(event) {
        this.setState({matriculeFiscale: event.target.value});       
      }
    handlesecteurActiviteChange(event) {
        this.setState({secteurActivite: event.target.value});       
      }

    handlePhoneChange(event) {
        this.setState({phone: event.target.value});       
      }

      handleSubmit(e) {
        e.preventDefault();
    
        const data = {
          
          "name": this.state.name,
          "city": this.state.city,
          "postalcode": this.state.postalcode,
          "email": this.state.email,
          "logo": this.state.logo,
          "matriculeFiscale": this.state.matriculeFiscale,
          "secteurActivite": this.state.secteurActivite,
          "phone": this.state.phone,  
        };
    
        axios.post(`http://localhost:8000/api/companies`, {"name": this.state.name,
        "city": this.state.city,
        "postalcode": this.state.postalcode,
        "email": this.state.email,
        "logo": this.state.logo,
        "matriculeFiscale": this.state.matriculeFiscale,
        "secteurActivite": this.state.secteurActivite,
        "phone": this.state.phone,    })
          .then(res => {
            console.log({
            "name": this.state.name,
            "city": this.state.city,
            "postalcode": this.state.postalcode,
            "email": this.state.email,
            "logo": this.state.logo,
            "matriculeFiscale": this.state.matriculeFiscale,
            "secteurActivite": this.state.secteurActivite,
            "phone": this.state.phone,    });
          })
          this.setState({number: this.state.number +1})
      }


    render(){

        return(
            <Form onSubmit={this.handleSubmit}>
          <Row>
          <Col md>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Nom du companie</Form.Label>
              <Form.Control type="text" value={this.state.name} onChange={this.handleNameChange}/>
            </Form.Group>
          </Col>
          {/* value={this.state.name} onChange={this.handleNameChange} */}
            <Col md>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" value={this.state.email} onChange={this.handleEmailChange}  />
          </Form.Group>

          {/* value={this.state.company.email} onChange={this.handleEmailChange} */}
            </Col>
           

            <Col md>
            <Form.Group controlId="formVille">
          <Form.Label>ville</Form.Label>
            <Form.Control type="text" placeholder="ville" value={this.state.city} onChange={this.handleCityChange} />
          </Form.Group>
          
            </Col>
            </Row>
            <Row>
            <Col md>
            <Form.Group controlId="formPostalCode">
          <Form.Label>code postal</Form.Label>
            <Form.Control type="text" placeholder="postalcode" value={this.state.postalcode} onChange={this.handlepostalcodeChange}/>
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="formMatriculeFisc">
          <Form.Label>Matricule Fiscale</Form.Label>
            <Form.Control type="text" placeholder="Matricule Fiscale" value={this.state.matriculeFiscale} onChange={this.handlematriculeFiscaleChange} />
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="formSecteurAct">
          <Form.Label>Secteur Activite</Form.Label>
            <Form.Control type="text" placeholder="Secteur Activite"  value={this.state.secteurActivite} onChange={this.handlesecteurActiviteChange}/>
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="formPhone">
          <Form.Label>Numero de telephone</Form.Label>
            <Form.Control type="text" value={this.state.phone} onChange={this.handlePhoneChange} />
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="formLogo">
          <Form.Label>Logo</Form.Label>
            <Form.Control type="text" value={this.state.logo} onChange={this.handlelogoChange}  />
          </Form.Group>
          
            </Col>
            </Row>
                      
          <Button variant="secondary" type="submit" >Ajouter Company</Button>
        </Form>
        )
    }
}

export default FormAjoutCompany;