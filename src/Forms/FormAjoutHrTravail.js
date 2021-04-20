import React, {Component} from 'react';
import { Row , Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Forms.css'

class FormAjoutHrTravail extends Component{

    constructor(props) {
        super(props);
        this.state = { 
             
               "companyId": "",
               "heure_deb": "",
               "heure_fin": "",
               "heure_deb_pause": "",
               "heure_fin_pause": "",
               "is_seance_unique": "",
        };
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleHrDebChange=this.handleHrDebChange.bind(this);
        this.handleHrFinChange=this.handleHrFinChange.bind(this);
        this.handleDebutPauseChange=this.handleDebutPauseChange.bind(this);
        this.handleFinPauseChange=this.handleFinPauseChange.bind(this);
        this.handleSeanceUniqueChange=this.handleSeanceUniqueChange.bind(this);
       
    }

    addHr(){
        axios.post(`http://localhost:8000/api/companies`,{
       
            "companyId": this.state.companyId,
            "heure_deb": this.state.heure_deb,
            "heure_fin": this.state.heure_fin,
            "heure_deb_pause": this.state.heure_deb_pause,
            "heure_fin_pause": this.state.heure_fin_pause,
            "is_seance_unique": this.state.is_seance_unique,         
        })
    
    }

    handleNameChange(event) {
        this.setState({companyId: event.target.value})
      }
    
    handleHrDebChange(event) {
        this.setState({heure_deb: event.target.value})
      }

    handleHrFinChange(event) {
        this.setState({heure_fin: event.target.value})
      }

    handleDebutPauseChange(event) {
        this.setState({heure_deb_pause: event.target.value})
      } 
    
    handleFinPauseChange(event) {
        this.setState({heure_fin_pause: event.target.value})
      } 

    handleSeanceUniqueChange(event) {
        this.setState({is_seance_unique: event.target.value})
      }
      

      handleSubmit(e) {
        e.preventDefault();
    
        const data = {
          
            "companyId": this.state.companyId,
            "heure_deb": this.state.heure_deb,
            "heure_fin": this.state.heure_fin,
            "heure_deb_pause": this.state.heure_deb_pause,
            "heure_fin_pause": this.state.heure_fin_pause,
            "is_seance_unique": this.state.is_seance_unique, 
        };
    
        axios.post(`http://localhost:8000/api/companies`, 
        {"name": this.state.name,
        "companyId": this.state.companyId,
            "heure_deb": this.state.heure_deb,
            "heure_fin": this.state.heure_fin,
            "heure_deb_pause": this.state.heure_deb_pause,
            "heure_fin_pause": this.state.heure_fin_pause,
            "is_seance_unique": this.state.is_seance_unique,    })
          .then(res => {
            console.log({
                "companyId": this.state.companyId,
                "heure_deb": this.state.heure_deb,
                "heure_fin": this.state.heure_fin,
                "heure_deb_pause": this.state.heure_deb_pause,
                "heure_fin_pause": this.state.heure_fin_pause,
                "is_seance_unique": this.state.is_seance_unique,    });
          });

        
      
      

      }


    render(){

        return(
            <Form onSubmit={this.handleSubmit}>
          <Row>
          <Col md>
            <Form.Group controlId="formcompanyId">
              <Form.Label>Nom du companie</Form.Label>
              <Form.Control type="text" value={this.state.companyId} onChange={this.handleNameChange}/>
            </Form.Group>
          </Col>

            <Col md>
          <Form.Group controlId="formheure_deb">
            <Form.Label>Debut d'heures travail</Form.Label>
            <Form.Control type="time" min="08:00" max="18:00" value={this.state.heure_deb} onChange={this.handleHrDebChange}  />
          </Form.Group>

            </Col>
           

            <Col md>
            <Form.Group controlId="formheure_fin">
          <Form.Label>Fin heures travail</Form.Label>
            <Form.Control type="time" min="08:00" max="18:00" value={this.state.heure_fin} onChange={this.handleHrFinChange} />
          </Form.Group>
          
            </Col>
            </Row>
            <Row>
            <Col md>
            <Form.Group controlId="heure_deb_pause">
          <Form.Label>Debut de pause</Form.Label>
            <Form.Control type="time" min="08:00" max="18:00"  value={this.state.heure_deb_pause} onChange={this.handleDebutPauseChange}/>
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="heure_fin_pause">
          <Form.Label>Fin de pause</Form.Label>
            <Form.Control type="time" min="08:00" max="18:00"  value={this.state.heure_fin_pause} onChange={this.handleFinPauseChange} />
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="is_seance_unique">
          <Form.Label>Seance Unique</Form.Label>
            <Form.Control type="checkbox"  value={this.state.is_seance_unique} onChange={this.handleSeanceUniqueChange}/>
          </Form.Group>
          
            </Col>

           
            </Row>
                      
          <Button variant="secondary" type="submit" >Ajouter Heures Travail</Button>
        </Form>
        )
    }
}

export default FormAjoutHrTravail;