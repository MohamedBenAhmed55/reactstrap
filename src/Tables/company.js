import React, {Component} from 'react';

import Popup from "reactjs-popup";
import FormAjoutCompany from '../Forms/FormAjoutCompany'
import { Row , Col, Button, Form, Modal } from 'react-bootstrap';

import axios from 'axios';

class Company extends Component{
    constructor() {
        super();
        this.state = { companies: [] ,
            show: false,
            setShow: false,};
            this.handleClose=this.handleClose.bind(this);
            this.handleShow=this.handleShow.bind(this);
            this.refreshPage=this.refreshPage.bind(this);
    }

   handleClose = () =>{
       this.setState({setShow: false});
       this.refreshPage();
    };
   handleShow = () => this.setState({setShow: true});

    componentDidMount() {
        this.getCompanies();
        
    }
     refreshPage = ()=>{
        window.location.reload();
     }



     getCompanies() {
        axios.get(`http://localhost:8000/api/companies`).then(response => {
            this.setState({ companies: response.data['hydra:member']})
        })
     }  

    deleteCompany(id){
       axios.delete(`http://localhost:8000/api/companies/${id}`);
       this.refreshPage();
       
    }

    modifyCompany(id){
        axios.put(`http://localhost:8000/api/companies/${id}`);
    }
      
    render(){

        
        return(
            <div>
                <section className="row-section">
                
                    <div className="container">
                   
                        {
                            <div className={'row'}>
                                
                                                                         
                                             <table class="table table-hover">
                                               <thead>
                                                  <tr>                                                
                                                  <th scope="col">Name</th>
                                                  <th scope="col">City</th>
                                                  <th scope="col">postal code</th>
                                                  <th scope="col">email</th>
                                                  <th scope="col">logo</th>
                                                  <th scope="col">matriculeFiscale</th>
                                                  <th scope="col">secteurActivite</th>
                                                  <th scope="col">phone</th>
                                                  <th scope="col"></th>
                                                  <th scope="col"></th>
                                                 </tr>
                                                 </thead>
                                                 
                                                 <tbody>
                                                 { this.state.companies.map(company =>
                                                    <tr class="table-light" key={company.id} >
                                                      <td>{company.name}</td>
                                                      <td>{company.city}</td>
                                                      <td>{company.postalcode}</td>
                                                      <td>{company.email}</td>
                                                      <td>{company.logo}</td>
                                                      <td>{company.matriculeFiscale}</td>
                                                      <td>{company.secteurActivite}</td>
                                                      <td>{company.phone}</td>
                                                      <td><Button onClick={ () => this.modifyCompany(company.id) } >Modify</Button></td>
                                                      <td><Button onClick={ () => this.deleteCompany(company.id) } >Remove</Button></td>
                                                    </tr>)} 
   
                                                 </tbody>                                                
                                             </table>                                        
                                    </div>
                                                        
                        }
                       
                    </div>
                </section>
                <div className="container">
                 <Button variant="primary" onClick={this.handleShow}>
                     Ajouter Companie
                 </Button>
                
                <Modal
        show={this.state.setShow}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Companie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAjoutCompany />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
                
                
                </div>
            </div>
        )
    }
}

export default Company;