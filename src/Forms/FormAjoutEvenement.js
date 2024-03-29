import React, { Component } from 'react';
import { Row , Col , Button , Form, Container} from 'react-bootstrap';
import axios from 'axios';

class FormAjoutEvenement extends Component{

  constructor() {
    super();
    this.state = { sallesNames: [] };
}



  componentDidMount(){
    this.getSallesNames();

  }

  getSallesNames() {
    axios.get(`http://localhost:8000/api/salles_Names`).then(response => {
        this.setState({ sallesNames: response.data['data'] })
        
    })
}


updatepassword(id) {
  axios({
    method: 'patch',
    url: `http://localhost:8000/api/users/${id}`,
    data: {
      "password": this.state.password,
    },
    headers: {
      "Content-Type": 'application/merge-patch+json'
    }
  })
}



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

          <Col md>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                 <Form.Label>Description</Form.Label>
                 <Form.Control as="textarea" rows={3} />
              </Form.Group>        
            </Col>

            </Col>
           
            </Row>

            <Row>
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
            <Form.Group as={Col} controlId="formSalleId">
              <Form.Label>Salle</Form.Label>
               <Form.Control as="select" defaultValue="01">
                 { this.state.sallesNames.map(salle=>
                 <option>{salle.name}</option>)
                }
               </Form.Control>
             </Form.Group> 
          
            </Col>

            
            </Row>
            <Row>
            <Col md>
            <Form>
        {['checkbox'].map((type) => (
            <div key={`default-${type}`} >
               <Form.Check 
                 type={type}
                 id={`default-${type}`}
                 label="En ligne" name="" value=""
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
                      
          <Button variant="secondary" type="submit">Confirmer</Button>
        </Form>
        </Container>
        )
    }
}

export default FormAjoutEvenement;