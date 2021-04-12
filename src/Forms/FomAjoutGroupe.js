import React, {Component} from 'react';
import { Row , Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutGroupe extends Component{

    constructor(props) {
        super(props);
        this.state = { 
             
               "name": "",
               "chef":"",
               "company_id": "",
        };

        this.handleChefChange=this.handleChefChange.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this); 
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    addPoste(){
        axios.post(`http://localhost:8000/api/groupes`,{
       
               "name": this.state.name,
               "chef":this.state.chef,        
        })
        
    }
    
    handleChefChange(event) {
      this.setState({chef: event.target.value})
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});       
      }


      
handleSubmit(e) {
    e.preventDefault();
   
    axios.post(`http://localhost:8000/api/groupes`, { 
        "name": this.state.name,
        "chef":this.state.chef,
        "company_id": this.state.company_id,   })
      .then(res => {
        console.log({ 
            "name": this.state.name,
               "chef":this.state.chef,
               "company_id": this.state.company_id,   });
      })
  }
   


    render(){

        return(
            <Form onSubmit={this.handleSubmit}>
          <Row>
          <Col md>
            <Form.Group controlId="formGroupName">
              <Form.Label>Nom du groupe</Form.Label>
              <Form.Control type="text" value={this.state.name} onChange={this.handleNameChange}/>
            </Form.Group>
          </Col>

            <Col md>
          <Form.Group controlId="formChef">
            <Form.Label>Nom du chef</Form.Label>
            <Form.Control type="text" value={this.state.chef} onChange={this.handleChefChange}  />
          </Form.Group>

            </Col>   
               
            </Row>
                      
          <Button variant="secondary" type="submit" >Ajouter Groupe</Button>
        </Form>
        )
    }
}

export default FormAjoutGroupe;