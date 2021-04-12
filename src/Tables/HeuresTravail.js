import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Popup from "reactjs-popup";
import Forms from '../Forms/FormAjoutUtilisateur'
import axios from 'axios';

class HeuresTravail extends Component{
    
    constructor() {
        super();
        this.state = { Heures: [] };
       
    }

    componentDidMount() {
        this.getHeures();
        
    }

    getHeures() {
        axios.get(`http://localhost:8000/api/heures_travails/`).then(response => {
            this.setState({ Heures: response.data['hydra:member']})
            // console.log(response.data['hydra:member']);
        })
     }  

     deleteHeures() {
        axios.get(`http://localhost:8000/api/heures_travails/`).then(response => {
            this.setState({ Heures: response.data['hydra:member']})
            // console.log(response.data['hydra:member']);
        })
     }


    render(){
        return(
            <div>
                <section className="row-section">
                
                    <div className="container">
                   
                        {
                            <div className={'row'}>
                                
                                    <div className="col-md-10 offset-md-1 row-block" >                                      
                                             <table class="table table-hover">
                                               <thead>
                                                  <tr>                                                

                                                  
                                                  <th scope="col">Heure_deb</th>
                                                  <th scope="col">Heure_fin</th>
                                                  <th scope="col">Heure_deb_pause</th>
                                                  <th scope="col">Heure_fin_pause</th>
                                                  <th scope="col">Seance Unique</th>
                                                  <th scope="col"></th>
                                                  <th scope="col"></th>
                                                 </tr>
                                                 </thead>
                                                 
                                                 <tbody>
                                                 { this.state.Heures.map(heure =>
                                                    <tr class="table-light" key={heure.id}>

                                                      
                                                      <td>{heure.heureDeb.substr(11,8)}</td>
                                                      <td>{heure.heureFin.substr(11,8)}</td>
                                                      <td>{heure.heureDebPause.substr(11,8)}</td>
                                                      <td>{heure.heureFinPause.substr(11,8)}</td>
                                                      <td>{ heure.isSeanceUnique ? "Oui" : "Non"}</td>
                                                      <td><Button>Modify</Button></td>
                                                      <td><Button>Delete</Button></td>
                                                    </tr>)}    
                                                 </tbody>                                             
                                             </table>                                        
                                    </div>
                               
                       
                               
                            </div>
                        }
                       
                    </div>
                </section>
                <div className="container">
                <div className={'row'}>
                <div className="col-md-10 offset-md-1 row-block" >
                <Popup trigger={<Button> Add Jour ferie</Button>} position="right center">
                     <Forms />
                </Popup>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default HeuresTravail;