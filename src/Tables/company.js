import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Popup from "reactjs-popup";

import axios from 'axios';

class Company extends Component{
    constructor() {
        super();
        this.state = { companies: [] };
       
    }

    componentDidMount() {
        this.getCompanies();
        
    }

    // getCompanies() {
    //     axios.get(`http://localhost:8000/api/companies`).then(response => {
            
    //          console.log(response.data['hydra:member'])}
    //     )
    //  }

     getCompanies() {
        axios.get(`http://localhost:8000/api/companies`).then(response => {
            this.setState({ companies: response.data['hydra:member']})
        })
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
                                                 { this.state.companies.map(company =>
                                                 <tbody>
                                                    <tr class="table-light" >
                                                      <td>{company.name}</td>
                                                      <td>{company.city}</td>
                                                      <td>{company.postalcode}</td>
                                                      <td>{company.email}</td>
                                                      <td>{company.logo}</td>
                                                      <td>{company.matriculeFiscale}</td>
                                                      <td>{company.secteurActivite}</td>
                                                      <td>{company.phone}</td>
                                                      <td><Button>Modify</Button></td>
                                                      <td><Button>Delete</Button></td>
                                                    </tr>
   
                                                 </tbody>        )}                                         
                                             </table>                                        
                                    </div>
                               
                       
                               
                            
                        }
                       
                    </div>
                </section>
                <div className="container">
                
                
                <Popup trigger={<Button> Add Company</Button>} position="right center">
                     
                </Popup>
                
                
                </div>
            </div>
        )
    }
}

export default Company;