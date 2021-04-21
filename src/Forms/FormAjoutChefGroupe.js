import React, { Component } from 'react';
import { Row , Col , Button , Form} from 'react-bootstrap';
import axios from 'axios';

class FormAjoutChefGroupe extends Component{
 
  constructor(props) {
    super(props);
    this.state = { 
         
           "datedeb": "",
           "dateemb":"",
    };

    this.onChange=this.onChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}

addChef(){
    axios.post(`http://localhost:8000/api/groupes`,{   
           "name": this.state.name,
           "chef":this.state.chef,        
    })
    
}

onChange(e){
  this.setState({[e.target.name]:e.target.value});
 }

    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
          <Row>
            
            <Col md>
            <Form.Group controlId="formDateDeb">
          <Form.Label>Date de Naissance</Form.Label>
            <Form.Control type="date" value={this.state.dateDeb} name ="name" onChange={this.onChange}  />
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="formDateFin">
          <Form.Label>Date embauche</Form.Label>
            <Form.Control type="date" value={this.state.dateemb} name ="name" onChange={this.onChange} />
          </Form.Group>
          
            </Col>
            </Row>
                      
          <Button variant="secondary" type="submit">Ajouter Chef</Button>
        </Form>
        )
    }
}

export default FormAjoutChefGroupe;