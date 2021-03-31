import React, { Component } from 'react';
import { Row , Col , Button , Form, Container} from 'react-bootstrap';

class FormAjoutEvenement extends Component{

    render(){

        return(
          <Container >
            <Form>
          <Row>
            <Col md>
            <Form.Group controlId="formTitre">
            <Form.Label>Titre d'evenement</Form.Label>
            <Form.Control type="text" placeholder="Titre de votre evenement" />           
          </Form.Group>

            </Col>
            <Col md>
          <Form.Group controlId="formDatedebut">
            <Form.Label>Date de début</Form.Label>
            <Form.Control type="date"  />
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="formDatefin">
            <Form.Label>Date Fin</Form.Label>
            <Form.Control type="date"  />
          </Form.Group>
          
            </Col>
            </Row>
            <Row>
            <Col md>
            <Form.Group as={Col} controlId="formEventType">
              <Form.Label>Type</Form.Label>
               <Form.Control as="select" defaultValue="Reunion">
                 <option>Reunion</option>
                 <option>mission</option>
                 <option>formation</option>
                 <option>rendez-vous</option>
                 <option>Autre</option>
               </Form.Control>
             </Form.Group>          
            </Col>

            <Col md>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                 <Form.Label>Description</Form.Label>
                 <Form.Control as="textarea" rows={3} />
              </Form.Group>        
            </Col>

            <Col md>
            <Form.Group as={Col} controlId="formSalleId">
              <Form.Label>Salle</Form.Label>
               <Form.Control as="select" defaultValue="01">
                 <option>01</option>
                 <option>02</option>
                 <option>03</option>
                 <option>04</option>
                 <option>05</option>
               </Form.Control>
             </Form.Group> 
          
            </Col>

            <Col md>
            <Form>
        {['checkbox'].map((type) => (
            <div key={`default-${type}`} >
               <Form.Check 
                 type={type}
                 id={`default-${type}`}
                 label="En ligne"
               />
             </div>
           ))}
             </Form>
          
            </Col>

            <Col md>
            <Form.Group controlId="formTitre">
            <Form.Label>Lien</Form.Label>
            <Form.Control type="text" placeholder="votre lien" />           
          </Form.Group>
          
            </Col>
            </Row>
                      
          <Button variant="secondary" type="submit">Ajouter Utilisateur</Button>
        </Form>
        </Container>
        )
    }
}

export default FormAjoutEvenement;