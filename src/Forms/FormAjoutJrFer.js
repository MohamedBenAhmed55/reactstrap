import React, {Component} from 'react';
import { Row , Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class FormAjoutJrFer extends Component{

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
        this.handleCompanyIdChange=this.handleCompanyIdChange.bind(this);
   
       
    }

    addCompany(){
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
            <Form.Control type="email" value={this.state.heure_deb} onChange={this.handleHrDebChange}  />
          </Form.Group>

            </Col>
           

            <Col md>
            <Form.Group controlId="formheure_fin">
          <Form.Label>Fin heures travail</Form.Label>
            <Form.Control type="text" placeholder="ville" value={this.state.heure_fin} onChange={this.handleCityChange} />
          </Form.Group>
          
            </Col>
            </Row>
            <Row>
            <Col md>
            <Form.Group controlId="heure_deb_pause">
          <Form.Label>Debut de pause</Form.Label>
            <Form.Control type="text" placeholder="postalcode" value={this.state.heure_deb_pause} onChange={this.handlepostalcodeChange}/>
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="heure_fin_pause">
          <Form.Label>Fin de pause</Form.Label>
            <Form.Control type="text" placeholder="Matricule Fiscale" value={this.state.heure_fin_pause} onChange={this.handlematriculeFiscaleChange} />
          </Form.Group>
          
            </Col>

            <Col md>
            <Form.Group controlId="is_seance_unique">
          <Form.Label>Seance Unique</Form.Label>
            <Form.Control type="checkbox"  value={this.state.is_seance_unique} onChange={this.handlesecteurActiviteChange}/>
          </Form.Group>
          
            </Col>

           
            </Row>
                      
          <Button variant="secondary" type="submit" >Ajouter Company</Button>
        </Form>
        )
    }
}

export default FormAjoutJrFer;