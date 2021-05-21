import React, { Component } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from "jwt-decode";

class FormAjoutGroupe extends Component {

  constructor(props) {
    super(props);
    this.state = {

      "name": "",
      "chef": "",
      "company_id": jwt_decode(localStorage.getItem('token')).company,
      "id":props.modify,
      "chefsNames":[],
      "data":props.data,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let message = this.fieldsControl();
    if(message){
      alert(message)}
     else {
    if (this.state.id){
      this.updateGroup(this.state.id);
    }
    else{
      console.log("/api/chef_groupes/" +this.state.chef)

    axios.post(`http://localhost:8000/api/groupes`, {
      "name": this.state.name,
      // "chef": "/api/chef_groupes/" +this.state.chef,
      "company": "/api/companies/" +this.state.company_id,
    })
      .then(res => {
        alert("succès !")
      }).catch(err => {
        alert("l'opération a échoué ")
      })
  }
}
}

  updateGroup(id) {
    axios({
      method: 'patch',
      url: `http://localhost:8000/api/groupes/${id}`,
      data: {
        "name": this.state.name,
      },
      headers: {
        "Content-Type": 'application/merge-patch+json'
      }
      }).then(res =>{
        alert("group updated");
    }).catch(err => {
      alert("l'opération a échoué ")
    })
  }

  setFields() {
    if(this.state.data){
      this.setState({ name: this.state.data.name});}
      console.log(this.state.data)

  }

  componentDidMount() {   
    this.getchefsNames();
    this.setFields(); 
    // console.log( jwt_decode(localStorage.getItem('token')).company)
  }

  fieldsControl() {
    let message="";

      if (!isNaN(this.state.name)){
          message = message + " le nom du groupe ne doit pas être un nombre!  " + 
          this.setState({name: this.state.name})
      }
                     
      return message;
 }

 getchefsNames() {
  axios.get(`http://localhost:8000/api/chefs_Names`).then(response => {
      this.setState({ chefsNames: response.data['data'] })
      
  })
}

 

  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md>
            <Form.Group controlId="formGroupName">
              <Form.Label>Nom du groupe</Form.Label>
              <Form.Control type="text" value={this.state.name} name="name" onChange={this.onChange} />
            </Form.Group>
          </Col>

         {/* <Col md>
            <Form.Group as={Col} controlId="formSalleId">
              <Form.Label>Chef</Form.Label>
               <Form.Control as="select" defaultValue="01" value={this.state.chef} name="chef" onChange={this.onChange}>
                 { this.state.chefsNames.map(chef=>
                 <option>{chef.id}</option>)
                }
               </Form.Control>
             </Form.Group> 
          
            </Col> */}

        </Row>

        <Button variant="secondary" type="submit" >Confirmer</Button>
      </Form>
    )
  }
}

export default FormAjoutGroupe;