import React, { Component } from 'react';
import axios from 'axios';
import './GlobalCalendar.css'
import Forms from '../Forms/FormAjoutEvenement';
import FormsTache from '../Forms/FormTache'
import ModalEntity from '../ModalEntity';
import jwtDecode from 'jwt-decode';
import { Row, Col, Button, Form } from 'react-bootstrap';

class GlobalCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TailleTab:[
        {taille: 1},
        {taille: 2},
        {taille: 3},
        {taille: 4},
        {taille: 5},
        {taille: 6},
        {taille: 7},
        {taille: 8},
        {taille: 9},
        {taille: 10},

      ],
      user:"",
      id: jwtDecode(localStorage.getItem('token')).UserId,
    };
  }

  getUser(id) {

    axios.get(`http://localhost:8000/api/getsingleuser/${id}`).then(response => {
        console.log(response.data);
        this.setState({ user: response.data });
        console.log(this.state.user);
        this.setState({ datenais: this.state.user.datenais.date, dateemb: this.state.user.dateemb.date });
        console.log(this.state.user.id);

    })
}

componentDidMount(){
  this.getUser(this.state.id)
}


  maketable(i){
        return(<th scope="col">jour {i}</th>)           
  }

  render() {

    return (  
      <div className="col-md-10 offset-md-1 row-block" >
      <table class="table table-hover" style={{marginTop:70}}>
      <thead>
        <tr>
          <th scope="col">Utilisateur</th>
          {this.state.TailleTab.map( tab=>
           this.maketable(tab.taille))
          }
        </tr>
      </thead>
      <tbody>
        <tr class="table-light">
          <th scope="row">{this.state.user.name}  {this.state.user.lastname}</th>
          <td scope="row"><ModalEntity Buttontitle="+" title="Choisissez votre action" body={<Row><Col><ModalEntity Buttontitle="Ajouter événement" title="Ajouter evenement" body={<Forms />} /> </Col> <Col style={{marginLeft:-75}}><ModalEntity Buttontitle="Ajouter Tache" title="Ajouter Tache" body={<FormsTache />} /></Col></Row>} /></td>
          <td scope="row"><ModalEntity Buttontitle="+" title="Choisissez votre action" body={<Row><Col><ModalEntity Buttontitle="Ajouter événement" title="Ajouter evenement" body={<Forms />} /> </Col> <Col style={{marginLeft:-75}}><ModalEntity Buttontitle="Ajouter Tache" title="Ajouter Tache" body={<FormsTache />} /></Col></Row>} /></td>
          <td scope="row"><ModalEntity Buttontitle="+" title="Choisissez votre action" body={<Row><Col><ModalEntity Buttontitle="Ajouter événement" title="Ajouter evenement" body={<Forms />} /> </Col> <Col style={{marginLeft:-75}}><ModalEntity Buttontitle="Ajouter Tache" title="Ajouter Tache" body={<FormsTache />} /></Col></Row>} /></td>
          <td scope="row"><ModalEntity Buttontitle="+" title="Choisissez votre action" body={<Row><Col><ModalEntity Buttontitle="Ajouter événement" title="Ajouter evenement" body={<Forms />} /> </Col> <Col style={{marginLeft:-75}}><ModalEntity Buttontitle="Ajouter Tache" title="Ajouter Tache" body={<FormsTache />} /></Col></Row>} /></td>
          <td scope="row"><ModalEntity Buttontitle="+" title="Choisissez votre action" body={<Row><Col><ModalEntity Buttontitle="Ajouter événement" title="Ajouter evenement" body={<Forms />} /> </Col> <Col style={{marginLeft:-75}}><ModalEntity Buttontitle="Ajouter Tache" title="Ajouter Tache" body={<FormsTache />} /></Col></Row>} /></td>
          <td scope="row"><ModalEntity Buttontitle="+" title="Choisissez votre action" body={<Row><Col><ModalEntity Buttontitle="Ajouter événement" title="Ajouter evenement" body={<Forms />} /> </Col> <Col style={{marginLeft:-75}}><ModalEntity Buttontitle="Ajouter Tache" title="Ajouter Tache" body={<FormsTache />} /></Col></Row>} /></td>
          <td scope="row"><ModalEntity Buttontitle="+" title="Choisissez votre action" body={<Row><Col><ModalEntity Buttontitle="Ajouter événement" title="Ajouter evenement" body={<Forms />} /> </Col> <Col style={{marginLeft:-75}}><ModalEntity Buttontitle="Ajouter Tache" title="Ajouter Tache" body={<FormsTache />} /></Col></Row>} /></td>
          <td scope="row"><ModalEntity Buttontitle="+" title="Choisissez votre action" body={<Row><Col><ModalEntity Buttontitle="Ajouter événement" title="Ajouter evenement" body={<Forms />} /> </Col> <Col style={{marginLeft:-75}}><ModalEntity Buttontitle="Ajouter Tache" title="Ajouter Tache" body={<FormsTache />} /></Col></Row>} /></td>
          <td scope="row"><ModalEntity Buttontitle="+" title="Choisissez votre action" body={<Row><Col><ModalEntity Buttontitle="Ajouter événement" title="Ajouter evenement" body={<Forms />} /> </Col> <Col style={{marginLeft:-75}}><ModalEntity Buttontitle="Ajouter Tache" title="Ajouter Tache" body={<FormsTache />} /></Col></Row>} /></td>
          <td scope="row"><ModalEntity Buttontitle="+" title="Choisissez votre action" body={<Row><Col><ModalEntity Buttontitle="Ajouter événement" title="Ajouter evenement" body={<Forms />} /> </Col> <Col style={{marginLeft:-75}}><ModalEntity Buttontitle="Ajouter Tache" title="Ajouter Tache" body={<FormsTache />} /></Col></Row>} /></td>
          

        </tr>

      </tbody>
    </table>
    </div>

    )
  }
}

export default GlobalCalendar;