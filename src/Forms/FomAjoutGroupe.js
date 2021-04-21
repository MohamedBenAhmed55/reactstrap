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

        this.onChange=this.onChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    addPoste(){
        axios.post(`http://localhost:8000/api/groupes`,{
       
               "name": this.state.name,
               "chef":this.state.chef,        
        })
        
    }
    
    onChange(e){
      this.setState({[e.target.name]:e.target.value});
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
              <Form.Control type="text" value={this.state.name} name ="name" onChange={this.onChange}/>
            </Form.Group>
          </Col>

            <Col md>
          <Form.Group controlId="formChef">
            <Form.Label>Nom du chef</Form.Label>
            <Form.Control type="text" value={this.state.chef} name="chef" onChange={this.onChange}  />
          </Form.Group>

            </Col>   
               
            </Row>
                      
          <Button variant="secondary" type="submit" >Ajouter Groupe</Button>
        </Form>
        )
    }
}

export default FormAjoutGroupe;