import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Popup from "reactjs-popup";
import Forms from '../Forms/FormAjoutUtilisateur'
import axios from 'axios';


class JourFerie extends Component{
    constructor() {
        super();
        this.state = { jours: []
        //     {'id' : 1,
        //     'titre' : 'Fete independance',
        //     'date' : '20-03-2021'
        //     }
        // ,
        
        //     {'id' : 2,
        //     'titre' : 'Fete de travail',
        //     'date' : '01-05-2021'}
        // ,
        
        //     {'id' : 3,
        //     'titre' : 'Fete de martyrs',
        //     'date' : '09-04-2021'}
        
      
    };
    }

    componentDidMount() {
        this.getJoursFeries();
        
    }



    getJoursFeries() {
        axios.get(`http://localhost:8000/api/jours_feries`).then(response => {
            this.setState({ jours: response.data['hydra:member']})
    //    console.log(response.data['hydra:member']) 
        })
     }
     deleteJour(id){
        axios.delete(`http://localhost:8000/api/jours_feries/${id}`);
        
     }
 
     modifyJour(id){
         axios.put(`http://localhost:8000/api/jours_feries/${id}`);
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

                                                  <th scope="col">Titre</th>
                                                  <th scope="col">Date</th>
                                                  <th scope="col"></th>
                                                  <th scope="col"></th>
                                                 </tr>
                                                 </thead>
                                                 
                                                 <tbody>
                                                 { this.state.jours.map(jour =>
                                                    <tr class="table-light" key={jour.id}>

                                                      <td>{jour.titre}</td>
                                                      <td>{jour.date.substr(0,10)}</td>
                                                      <td><Button onClick={ () => this.modifyJour(jour.id) } >Modify</Button></td>
                                                      <td><Button onClick={ () => this.deleteJour(jour.id) } >Remove</Button></td>
                                                    </tr> )} 
   
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

export default JourFerie;