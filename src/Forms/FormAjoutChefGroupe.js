import React, { Component } from 'react';
import { Row , Col , Button , Form} from 'react-bootstrap';
import axios from 'axios';

class FormAjoutChefGroupe extends Component{
 
 

    render(){
        return(
            <Form>
          <Row>
            
            <Col md>
            <Form.Group controlId="formDateDeb">
          <Form.Label>Date de Naissance</Form.Label>
            <Form.Control type="date"  />
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="formDateFin">
          <Form.Label>Date embauche</Form.Label>
            <Form.Control type="date"  />
          </Form.Group>
          
            </Col>
            </Row>
                      
          <Button variant="secondary" type="submit">Ajouter Chef</Button>
        </Form>
        )
    }
}

export default FormAjoutChefGroupe;