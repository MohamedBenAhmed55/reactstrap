import React, {Component} from 'react';
import { Row , Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutPoste extends Component{

    constructor(props) {
        super(props);
        this.state = { 
             
               "name": "",
               "company_id": "",
        };

        this.handleCompanyChange=this.handleCompanyChange.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this); 
        // this.onChange=this.onChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    addPoste(){
        axios.post(`http://localhost:8000/api/postes`,{
       
               "name": this.state.name,
               "company_id": this.state.company_id,         
        })
        
    }
    
    handleCompanyChange(event) {
      this.setState({company_id: event.target.value})
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});       
      }

//     onChange(e) {
//         this.setState({[e.target.name]: e.target.value})
//    } 
      
handleSubmit(e) {
    e.preventDefault();

    // const data = {
      
    //     "name": this.state.name,
    //     "company_id": this.state.company_id,  
    // };

    axios.post(`http://localhost:8000/api/postes`, { 
    "name": this.state.name,
    "company_id": this.state.company_id,  })
      .then(res => {
        console.log({ 
            "name": this.state.name,
            "company_id": this.state.company_id,  });
      })
  }
   


    render(){

        return(
            <Form onSubmit={this.handleSubmit}>
          <Row>
          <Col md>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Nom du companie</Form.Label>
              <Form.Control type="text" value={this.state.company_id} onChange={this.handleCompanyChange}/>
            </Form.Group>
          </Col>

            <Col md>
          <Form.Group controlId="formPosteName">
            <Form.Label>Nom du poste</Form.Label>
            <Form.Control type="text" value={this.state.name} onChange={this.handleNameChange}  />
          </Form.Group>

            </Col>          
            </Row>
                      
          <Button variant="secondary" type="submit" onClick={this.addCompany}>Ajouter Company</Button>
        </Form>
        )
    }
}

export default FormAjoutPoste;